INSERT INTO test_users (nom, prenom, email, mdp, role)
VALUES (
  'Admin',
  'Vintage',
  'admin@example.com',
  '$2b$10$XCWp1nY//wH5WZxkVy7Jlu1p6UZr3PM.C3nwftcBOZLoPFWPxF8SO',
  'admin'
)
ON DUPLICATE KEY UPDATE mdp = VALUES(mdp), role = 'admin';
