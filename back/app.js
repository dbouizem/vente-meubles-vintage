const express=require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const app = express()
const router = require('./routes/users.routes.js')
const accueil = require('./routes/accueil.routes.js')
const produit = require('./routes/produit.routes.js')
const admin = require('./routes/admin.routes.js')

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization'],
}));

app.use(helmet());

if (process.env.NODE_ENV !== 'test') {
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { message: 'Trop de requetes, veuillez reessayer plus tard' },
  }));
}

app.use("/images", express.static("./Assets/img_meubles/"))
app.use("/inscription", express.static("./client/inscription.html")); 

app.use(express.json())

app.use('/',router)
app.use('/',accueil)
app.use('/',produit)
app.use('/', admin)

module.exports = app
