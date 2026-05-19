const connect  = require('../sql/connexion');
const { productSchema } = require('../validation/schemas');
const { validateBody } = require('../validation/validate');

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const deleteObject = async (req,res,next)=>{

const id = parseId(req.params.id);

if (!id) {
  return res.status(400).send({ message: "Id invalide" });
}

const query = "DELETE FROM testmeubles WHERE id = ?"

try {
  const [results] = await connect.query(query, [id]);

  if (results.affectedRows === 0) {
    return res.status(404).send({ message: "Meuble introuvable" });
  }

  res.status(200).send({message: "Suppression du meuble avec succès"});
} catch (error) {
  console.error("Erreur lors de la supression du meuble", error);
  res.status(500).send({ message: "Erreur lors de la supression du meuble" });
}
}


const updateObject = async (req, res, next) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).send({ message: "Id invalide" });
  }

  const { data, error: validationError } = validateBody(productSchema, req.body);

  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const { titre, prix, description, photo } = data;

  const query = "UPDATE testmeubles SET titre = ?, prix = ?, description = ?, photo = ? WHERE id = ?";
  const values = [titre, prix, description, photo, id];

  try {
    const [results] = await connect.query(query, values);

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: "Meuble introuvable" });
    }

    res.status(200).send({ message: "Modification du meuble réalisée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la modification du meuble", error);
    res.status(500).send({ message: "Erreur lors de la modification du meuble" });
  }
};
module.exports = {deleteObject, updateObject}
