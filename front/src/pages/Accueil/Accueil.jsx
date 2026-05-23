import Navbar from '../../composants/Navbar/Navbar';
import Header from '../../composants/Header/Header';
import Main from '../../composants/Main/Main';
import Footer from '../../composants/Footer/Footer';

function Accueil() {

  return (
    <div className="min-h-screen bg-[#0b0907] text-[#d8bc86]">
      <Navbar/>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}
export default Accueil;
