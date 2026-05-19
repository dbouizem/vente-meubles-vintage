const connect  = require('../sql/connexion');

const displayObjectmeubles = async (req,res,next)=>{
  try {
    const [results] = await connect.query('SELECT id,titre,prix,description,photo FROM testmeubles');
    res.status(200).send(results);
  } catch (error) {
    console.error("Erreur de récupération du meuble", error);
    res.status(500).send({ message: "Erreur lors de la recuperation des meubles" });
  }
}

module.exports = {displayObjectmeubles}
