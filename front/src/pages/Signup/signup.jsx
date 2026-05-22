import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import COVER_IMAGE from "./img.jpg";
import { apiUrl } from '../../config/api';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const addUser = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);
    try {
      const url = apiUrl('/signup')
      let res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          name: name,
          firstname: firstname,
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        navigate("/")
      } else {
        setMessage(resJson.message || "Impossible de créer le compte.");
      }
    } catch (err) {
      setMessage("Le serveur ne répond pas. Réessayez dans quelques instants.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5] font-ptMono lg:flex-row">
      <div className="flex min-h-screen w-full flex-col bg-[#f5f5f5] px-6 py-10 sm:p-12 lg:h-screen lg:w-1/2 lg:p-20">
        <p className="text-center font-aurore text-4xl text-dark-brown sm:text-5xl">Welcome to Vintage!</p>

        <div className='mt-10 flex w-full max-w-[550px] flex-1 flex-col justify-center self-center lg:mt-0'>
          <div className='mb-10 flex flex-col space-y-4 text-left'>
            <h1 className="text-3xl font-semibold text-dark-brown lg:text-4xl">Inscription</h1>
            <p className="text-sm text-gray-700">Veuillez entrer vos informations.</p>
          </div>
    
          <div className='w-full flex flex-col space-y-4'>
            <form onSubmit={addUser}>
              {message && (
                <p role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700">{message}</p>
              )}
              <label className="sr-only" htmlFor="signup-name">Nom</label>
              <input
                id="signup-name"
                type="text"
                value={name}
                placeholder='Nom'
                required
                autoComplete="family-name"
                className='my-2 w-full border-b border-black bg-transparent py-3 text-black outline-none placeholder:text-gray-500 focus:outline-none'
                onChange={(e) => setName(e.target.value)}
              />

              <label className="sr-only" htmlFor="signup-firstname">Prénom</label>
              <input
                id="signup-firstname"
                type="text"
                value={firstname}
                placeholder='Prénom'
                required
                autoComplete="given-name"
                className='my-2 w-full border-b border-black bg-transparent py-3 text-black outline-none placeholder:text-gray-500 focus:outline-none'
                onChange={(e) => setFirstName(e.target.value)}
              />

              <label className="sr-only" htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                placeholder='Email'
                required
                autoComplete="email"
                className='my-2 w-full border-b border-black bg-transparent py-3 text-black outline-none placeholder:text-gray-500 focus:outline-none'
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="sr-only" htmlFor="signup-password">Mot de passe</label>
              <input
                id="signup-password"
                type="password"
                value={password}
                placeholder='Mot de passe'
                required
                minLength={6}
                autoComplete="new-password"
                className='my-2 w-full border-b border-black bg-transparent py-3 text-black outline-none placeholder:text-gray-500 focus:outline-none'
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" disabled={isSubmitting} className='mt-8 mb-8 flex w-full items-center justify-center rounded-md bg-dark-brown p-4 text-center font-semibold text-white transition hover:bg-[#2d1500] disabled:opacity-60'>
                {isSubmitting ? 'Création...' : 'Créer votre compte'}
              </button>
            </form>
          </div>

          <div className="w-full items-center space-y-10 lg:space-y-20">
            <p className="mt-4 text-center text-xs font-normal text-[#060606]">Vous avez un compte? <Link to=".."><span className='font-semibold underline underline-offset-2 cursor-pointer'>Connectez-vous</span></Link></p>
          </div>
        </div>
      </div>

      <div className="relative flex h-[50vh] w-full flex-col lg:h-screen lg:w-1/2">
        <div className="absolute left-[6%] right-[6%] top-[10%] z-10 bg-dark-brown/90 px-4 py-5 text-center text-white shadow-sm sm:left-[10%] sm:right-[10%]">
          <h2 className="text-xl font-bold leading-snug sm:text-2xl">Transformez votre intérieur avec nos meubles vintage uniques</h2>
          <p className="mt-4 text-sm leading-relaxed">Commencez gratuitement et bénéficiez des offres attractives de la communauté.</p>
        </div>
        <img src={COVER_IMAGE} className="h-full w-full object-cover" alt="Meuble vintage avec plantes et radio" />
      </div>
    </div>
  );
}

export default Signup;
