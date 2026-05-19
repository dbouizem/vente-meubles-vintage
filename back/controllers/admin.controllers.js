const connect  = require('../sql/connexion');

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const deleteObject = ((req,res,next)=>{

const id = parseId(req.params.id);

if (!id) {
  return res.status(400).send({ message: "Id invalide" });
}

const query = "DELETE FROM testmeubles WHERE id = ?"

connect.query(query, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la supression du meuble", error);
      res.status(500).send({ message: "Erreur lors de la supression du meuble" });
    } else {
      console.log("Suppression du meuble avec succès");
      res.status(200).send({message: "Suppression du meuble avec succès"});
      // Effectuer d'autres actions si nécessaire
    }
    })

})


const updateObject = (req, res, next) => {
  const id = parseId(req.params.id);
  const { titre, prix, description, photo } = req.body;

  if (!id) {
    return res.status(400).send({ message: "Id invalide" });
  }

  const query = "UPDATE testmeubles SET titre = ?, prix = ?, description = ?, photo = ? WHERE id = ?";
  const values = [titre, prix, description, photo, id];

  connect.query(query, values, (error, results) => {
    if (error) {
      console.error("Erreur lors de la modification du meuble", error);
      res.status(500).send({ message: "Erreur lors de la modification du meuble" });
    } else {
      console.log("Modification du meuble réalisée avec succès");
      res.status(200).send({ message: "Modification du meuble réalisée avec succès" });
      // Perform other necessary actions if needed
    }
  });
};
module.exports = {deleteObject, updateObject}
