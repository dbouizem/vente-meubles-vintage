const Bouton = ({ onClick, texteBouton, type = 'button', className = '' }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {texteBouton}
    </button>
  );
};

export default Bouton;
