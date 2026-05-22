import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import "./Vignette.css"  

function Vignette({ id, nom, prix, photo }) {
  let navigate = useNavigate();
  return (

    <Card className="w-full max-w-[18rem]">
    <Card.Img variant="top" src={photo} className="h-64 sm:h-80 object-cover"/>
    <Card.Body className="body">
      <Card.Title>{nom}</Card.Title>
      <Badge>{prix} €</Badge> 
      <Button className="button bg-dark-brown" onClick={() => {navigate(`/produit/${id}`);}} >Réserver</Button>
    </Card.Body>
  </Card>

  );
}

export default Vignette;
