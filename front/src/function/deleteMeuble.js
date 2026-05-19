const port = import.meta.env.VITE_PORT

function deleteMeuble(id){
    const url = `http://localhost:${port}/admin/${id}`

    fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        }
      })
        .then(response => {
            console.log(response)
          alert('meuble supprimé')
        })
        .catch(error => {
          // Gestion des erreurs
          console.error(error);
        });
}
export default deleteMeuble
