
import {useState} from 'react';
import Bouton from '../../composants/Bouton/Bouton';
import { Link, useNavigate } from 'react-router-dom';
import COVER_IMAGE from "./imageLogin.jpg";
import { apiUrl } from '../../config/api';


function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let loginUser = async (e) => {
    e.preventDefault();
    try {
      const url = apiUrl('/login')
      let res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      let resJson = await res.json();
      if (res.status === 200) {
        if (resJson.token) {
          localStorage.setItem("adminToken", resJson.token);
        } else {
          localStorage.removeItem("adminToken");
        }

        alert(resJson.message)
        navigate("/accueil")
      } else {
        alert(resJson.message || "Login Erreur")
      }
    } catch (err) {
      alert("Erreur lors de la connexion");
    }
  }



  return (

    <div className= "w-full min-h-screen flex flex-col lg:flex-row bg-[#f5f5f5]">
      <div className= 'relative w-full lg:w-1/2 h-64 lg:h-screen flex flex-col' >
        <div className= 'absolute top-[18%] left-[8%] right-[8%] flex flex-col '>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold my-4 drop-shadow-lg">Transformez votre intérieur avec nos meubles vintage uniques,</h1>
          <p className="text-base sm:text-xl text-white font-normal drop-shadow-lg">Commencez gratuitement et bénéficiez des offres attractives de la communauté. </p>
        </div>
        <img src={COVER_IMAGE} className="w-full h-full object-cover " alt="Salon vintage"/>
      </div>
      
      <div className="w-full lg:w-1/2 min-h-screen lg:h-screen bg-[#f5f5f5] flex flex-col px-6 py-10 sm:p-12 lg:p-20 space-y-10 lg:space-y-20 ">
        <h1 className="text-x1 text-left text-[#060606] font-semibold ">Vintage Logo</h1>

        <div className='w-full flex flex-col max-w-[550px]'>

          <div className='flex flex-col mb-10 '>
            <h3 className="text-3xl text-left font-semibold mb-2">Login</h3>
            <p className="text-base text-left mb- ">Veuillez entrer vos informations.</p>
          </div>

          <div className='w-full flex flex-col'>
            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder='Email'
                value={email}
                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' 
                onChange={(e) => setEmail(e.target.value)}
                />

              <input
                type="password"
                placeholder='Password'
                value={password}
                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' 
                onChange={(e) => setPassword(e.target.value)}
                />

              <div className='w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0'>
                <div className='w-full flex items-center'>
                  <input
                  type='checkbox'
                  className='w-4 h-4 mr-2 '/>
                  <p className='text-sm'>Remember me</p>
                </div>
                <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forgot Password?</p>
              </div>

              <div className='w-full flex flex-col my-8'>
                <div className='w-full text-[#ffffff] my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
                  <Bouton texteBouton='Log in'/> 
                </div>
              </div>
            </form>  

            <div className='w-full text-[#060606] my-2 font-semibold bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center'>
              <Link to="/signup" className='text-black'><Bouton texteBouton='Sign up' /></Link>
            </div>
          </div>
        </div>
        <div className ="w-full items-center space-y-20">
          <p className="text-sm text-center font-normal text-[#060606]">Vous n&#39;avez pas encore de compte? <Link to="signup"><span className='font-semibold underline underline-offset-2 curson-pointer'> Sign up</span></Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
