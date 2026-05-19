const connect  = require('../sql/connexion');
const bcrypt = require('bcrypt');
const { createAdminToken } = require('../middleware/auth.middleware');

const SALT_ROUNDS = 10;

const createObject = (async (req,res,next)=>{
  try {
    const nom = req.body.name
    const prenom = req.body.firstname
    const email = req.body.email
    const password = req.body.password

    if (!nom || !prenom || !email || !password) {
      return res.status(400).send({ message: "Tous les champs sont obligatoires" });
    }

    const mdp = await bcrypt.hash(password, SALT_ROUNDS);
    const values = [
      nom,
      prenom,
      email,
      mdp
    ]

    const query = "INSERT INTO test_users (nom, prenom, email, mdp) VALUES (?,?,?,?)"
    connect.query(query, values, (error, results) => {
      if (error) {
        console.error("Erreur lors de l'insertion de l'utilisateur", error);
        return res.status(500).send({message: "Erreur lors de l'insertion de l'utilisateur"});
      }

      console.log("Utilisateur inséré avec succès");
      res.status(200).send({message: "Utilisateur inséré avec succès"});
    });
  } catch (error) {
    console.error("Erreur lors du hash du mot de passe", error);
    res.status(500).send({message: "Erreur lors de la création de l'utilisateur"});
  }
})

const checkUserExists =((req,res, next) =>{
  const email = req.body.email
  console.log(email)

  const query2 = "SELECT EXISTS(SELECT 1 FROM test_users WHERE email = ?) as emailCheck "
  connect.query(query2, [email], (error, result)=> {
    console.log("result",result)
    // console.log("connectquery ?", result[0][exists])
    if (error) {
      console.error("Erreur ", error);
    }
    else if(result[0]['emailCheck']===1){
      console.log("utilisateur trouvé : ", result)
      res.status(200).send({message: "Utilisateur ok LOGIN"})
    }
    else if(result[0]['emailCheck']===0){
      console.log("user not found")
      res.status(200).send({message: "NON LOGIN"})
    }
    // connect.end();
  })
})



const checkedUser = (req, res, next) => {
  let email = req.body.email;
  if (email) {
    connect.query('SELECT * FROM test_users WHERE email = ?', [email], function(error, results) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.email = email;
        res.redirect('/accueil');
      }
      next()
    });
  }

  // connect.end() 

};

const checkLogin = ((req, res, next) => {
  let email = req.body.email;
	let password = req.body.password;

	if (!email || !password) {
		return res.status(400).send({message: 'Email et mot de passe obligatoires'});
	}

	connect.query('SELECT * FROM test_users WHERE email = ?', [email], async function(error, results, fields) {
		if (error) {
      console.error("Erreur lors de la connexion", error);
      return res.status(500).send({message: "Erreur lors de la connexion"});
    }

		if (results.length > 0 && await bcrypt.compare(password, results[0].mdp)) {
      const user = results[0];
      const isAdmin = user.role === 'admin';
      const token = isAdmin ? createAdminToken(user) : null;

      return res.status(200).send({
        message: "Connexion réussie",
        isAdmin,
        token,
      });
		}

    res.status(401).send({message: "Email ou mot de passe incorrect"});
	});
})

module.exports = {createObject, checkUserExists, checkedUser, checkLogin}
