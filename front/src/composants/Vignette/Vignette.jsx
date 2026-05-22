import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Button, Card } from "react-bootstrap";
import "./Vignette.css"  

function Vignette({ id, nom, prix, photo }) {
  let navigate = useNavigate();
  return (
    <Card className="w-full max-w-[18rem] border-0 bg-white p-4 shadow-sm">
      <Card.Img variant="top" src={photo} alt={nom} className="h-56 sm:h-64 object-cover"/>
      <Card.Body className="body px-0 pb-0 text-left">
        <Card.Title className="w-full text-base text-dark-brown">{nom}</Card.Title>
        <div className="flex w-full items-center justify-between gap-3">
          <Badge bg="primary">{prix} €</Badge> 
          <Button className="button bg-dark-brown border-0 px-4" onClick={() => {navigate(`/produit/${id}`);}} >Détails</Button>
        </div>
      </Card.Body>
    </Card>

  );
}

export default Vignette;
