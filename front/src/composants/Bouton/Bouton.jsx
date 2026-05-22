const Bouton = ({onClick, texteBouton}) => {
  return (
    <div>

      <button onClick={ onClick } >{texteBouton}</button>

    </div>
    
  )
}

export default Bouton;
