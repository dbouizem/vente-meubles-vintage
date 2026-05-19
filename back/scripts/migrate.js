const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(__dirname, '..', '..', envFile), quiet: true });

const database = process.env.DB_NAME || 'vente_meubles';
const migrationsDir = path.resolve(__dirname, '..', 'migrations');

const createConnection = (options = {}) => mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.USER_BDD || 'root',
  password: process.env.PASSWORD,
  port: Number(process.env.PORT_BDD) || 3306,
  multipleStatements: false,
  ...options,
});

const splitSqlStatements = (sql) => sql
  .split(';')
  .map((statement) => statement.trim())
  .filter(Boolean);

const ensureDatabaseExists = async () => {
  const connection = await createConnection();

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await connection.end();
  }
};

const ensureMigrationsTable = async (connection) => {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      filename VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY unique_filename (filename)
    )
  `);
};

const getAppliedMigrations = async (connection) => {
  const [rows] = await connection.query('SELECT filename FROM schema_migrations ORDER BY filename');
  return new Set(rows.map((row) => row.filename));
};

const getMigrationFiles = async () => {
  const entries = await fs.readdir(migrationsDir);
  return entries
    .filter((entry) => entry.endsWith('.sql'))
    .sort();
};

const runMigration = async (connection, filename) => {
  const sql = await fs.readFile(path.join(migrationsDir, filename), 'utf8');
  const statements = splitSqlStatements(sql);

  await connection.beginTransaction();

  try {
    for (const statement of statements) {
      await connection.query(statement);
    }

    await connection.query('INSERT INTO schema_migrations (filename) VALUES (?)', [filename]);
    await connection.commit();
    console.log(`Migration appliquee: ${filename}`);
  } catch (error) {
    await connection.rollback();
    throw error;
  }
};

const migrate = async () => {
  if (process.env.MIGRATE_CREATE_DATABASE === 'true') {
    await ensureDatabaseExists();
  }

  const connection = await createConnection({ database });

  try {
    await ensureMigrationsTable(connection);

    const appliedMigrations = await getAppliedMigrations(connection);
    const migrationFiles = await getMigrationFiles();

    let appliedCount = 0;

    for (const filename of migrationFiles) {
      if (!appliedMigrations.has(filename)) {
        await runMigration(connection, filename);
        appliedCount += 1;
      }
    }

    if (appliedCount === 0) {
      console.log('Aucune migration a appliquer');
    }
  } finally {
    await connection.end();
  }
};

if (require.main === module) {
  migrate().catch((error) => {
    console.error('Erreur pendant les migrations:', error);
    process.exit(1);
  });
}

module.exports = { migrate };
