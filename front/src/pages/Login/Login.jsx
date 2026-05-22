
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import COVER_IMAGE from "./imageLogin.jpg";
import { apiUrl } from '../../config/api';


function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);
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

        navigate("/accueil")
      } else {
        setMessage(resJson.message || "Connexion impossible. Vérifiez vos informations.");
      }
    } catch (err) {
      setMessage("Le serveur ne répond pas. Réessayez dans quelques instants.");
    } finally {
      setIsSubmitting(false);
    }
  }



  return (

    <div className= "flex min-h-screen w-full flex-col bg-[#f5f5f5] font-ptMono lg:flex-row">
      <div className= 'relative flex h-72 w-full flex-col lg:h-screen lg:w-1/2' >
        <div className= 'absolute left-[6%] right-[6%] top-[12%] z-10 bg-white/85 px-4 py-5 text-center text-dark-brown shadow-sm sm:left-[8%] sm:right-[8%] lg:top-[14%]'>
          <h1 className="text-lg font-bold leading-snug sm:text-2xl">Transformez votre intérieur avec nos meubles vintage uniques</h1>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">Commencez gratuitement et bénéficiez des offres attractives de la communauté.</p>
        </div>
        <img src={COVER_IMAGE} className="h-full w-full object-cover" alt="Salon vintage"/>
      </div>
      
      <div className="flex min-h-screen w-full flex-col bg-[#f5f5f5] px-6 py-10 sm:p-12 lg:h-screen lg:w-1/2 lg:px-20 lg:py-16">
        <p className="font-aurore text-5xl text-dark-brown">Vintage</p>

        <div className='mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-center'>

          <div className='mb-10 flex flex-col text-left'>
            <h1 className="mb-2 text-3xl font-semibold text-dark-brown sm:text-4xl">Bienvenue,</h1>
            <p className="text-sm text-gray-700">Veuillez entrer vos informations.</p>
          </div>

          <div className='w-full flex flex-col'>
            <form onSubmit={loginUser}>
              {message && (
                <p role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700">{message}</p>
              )}
              <label className="sr-only" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder='Email'
                value={email}
                required
                autoComplete="email"
                className='my-2 w-full border-b border-black bg-transparent py-3 text-black outline-none placeholder:text-gray-500 focus:outline-none' 
                onChange={(e) => setEmail(e.target.value)}
                />

              <label className="sr-only" htmlFor="login-password">Mot de passe</label>
              <input
                id="login-password"
                type="password"
                placeholder='Mot de passe'
                value={password}
                required
                autoComplete="current-password"
                className='my-2 w-full border-b border-black bg-transparent py-3 text-black outline-none placeholder:text-gray-500 focus:outline-none' 
                onChange={(e) => setPassword(e.target.value)}
                />

              <div className='mt-2 flex w-full flex-col gap-3 text-xs sm:flex-row sm:items-center sm:gap-0'>
                <div className='w-full flex items-center'>
                  <input
                  id="remember-me"
                  type='checkbox'
                  className='w-4 h-4 mr-2 '/>
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <button type="button" className='whitespace-nowrap underline underline-offset-2'>Forgot Password?</button>
              </div>

              <div className='my-8 flex w-full flex-col'>
                <button type="submit" disabled={isSubmitting} className='my-2 w-full rounded-md bg-dark-brown p-4 text-center font-semibold text-white transition hover:bg-[#2d1500] disabled:opacity-60'>
                  {isSubmitting ? 'Connexion...' : 'Log in'}
                </button>
              </div>
            </form>  

            <Link to="/signup" className='my-2 block w-full rounded-md border border-black bg-white p-4 text-center font-semibold text-[#060606] transition hover:bg-beige'>
              Sign up
            </Link>
          </div>
        </div>
        <div className ="w-full">
          <p className="text-center text-xs font-normal text-[#060606]">Vous n&#39;avez pas encore de compte? <Link to="signup"><span className='font-semibold underline underline-offset-2 cursor-pointer'>Sign up</span></Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
