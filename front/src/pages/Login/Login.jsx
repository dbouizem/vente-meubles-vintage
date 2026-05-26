
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, HelpCircle, Lock, Mail, PackageCheck, RotateCcw, ShieldCheck, Sparkles, UserRoundCheck } from 'lucide-react';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import COVER_IMAGE from "./imageLogin.jpg";
import { apiUrl } from '../../config/api';
import './Login.css';

const socialProviders = [
  { name: 'Google', Icon: GoogleIcon },
  { name: 'Apple', Icon: AppleIcon },
  { name: 'Facebook', Icon: FacebookIcon },
];

const trustItems = [
  [PackageCheck, 'Livraison sécurisée'],
  [RotateCcw, 'Retours gratuits sous 30 jours'],
  [ShieldCheck, 'Paiement 100% sécurisé'],
  [UserRoundCheck, 'Service client 7j/7'],
];


function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="login-page relative min-h-dvh overflow-x-hidden bg-[#0b0907] font-ptMono text-[#ead7b8]">
      <img src={COVER_IMAGE} className="absolute inset-0 h-full w-full object-cover object-center" alt="" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(198,161,107,0.20),transparent_30%),linear-gradient(90deg,rgba(10,7,5,0.86),rgba(10,7,5,0.56)_45%,rgba(10,7,5,0.88))]" />

      <header className="relative z-20 grid gap-3 px-3 py-4 text-[10px] uppercase tracking-[0.16em] min-[380px]:px-4 sm:grid-cols-3 sm:items-center sm:px-10 sm:py-6 sm:tracking-[0.18em]">
        <Link to="/accueil" className="inline-flex min-h-11 items-center gap-2 text-[#ead7b8] transition hover:text-[#c6a16b] focus-visible:outline-[#c6a16b] sm:gap-3">
          <ArrowLeft size={16} />
          Retour à la boutique
        </Link>
        <div className="text-center sm:block">
          <p className="font-serif text-2xl uppercase tracking-[0.12em] text-[#f1dfbf] sm:text-3xl">Atelier Héritage</p>
          <p className="mt-1 text-[10px] tracking-[0.45em] text-[#c6a16b]">Paris</p>
        </div>
        <a href="mailto:contact@vintage.local" className="hidden items-center justify-end gap-3 text-[#ead7b8] underline underline-offset-4 transition hover:text-[#c6a16b] sm:inline-flex">
          Besoin d’aide ?
          <HelpCircle size={18} />
        </a>
      </header>

      <main className="relative z-10 grid gap-6 px-3 pb-7 min-[380px]:px-4 sm:px-8 sm:pb-10 lg:min-h-[calc(100dvh-96px)] lg:grid-cols-[minmax(280px,0.82fr)_minmax(620px,0.72fr)] lg:items-center lg:gap-12 lg:px-10 xl:grid-cols-[minmax(420px,1fr)_minmax(680px,820px)] xl:px-14">
        <motion.aside
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="hidden min-h-[620px] flex-col justify-center lg:flex"
        >
          <div className="max-w-xs">
            <p className="font-serif text-7xl leading-none text-[#c6a16b]">“</p>
            <p className="mt-2 font-serif text-3xl leading-tight text-[#f1dfbf]">
              Chaque pièce raconte une époque, chaque client devient une part de notre histoire.
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.22em] text-[#ead7b8]/80">Atelier Héritage</p>
            <span className="mt-5 block h-px w-20 bg-[#c6a16b]" />
          </div>
        </motion.aside>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          className="login-card mx-auto w-full max-w-[720px] text-[#1b120b] lg:mr-0 xl:mr-8"
          aria-labelledby="login-title"
        >
          <div className="login-card-frame">
            <div className="text-center">
              <Sparkles className="mx-auto text-[#8b5a24]" size={22} />
              <h1 id="login-title" className="mt-3 font-serif text-4xl uppercase tracking-[0.08em] text-[#17100b] min-[380px]:mt-4 sm:text-5xl xl:text-6xl">Bienvenue</h1>
              <p className="mt-2 font-aurore text-2xl leading-none text-[#3b2412] sm:mt-3 sm:text-4xl">chez Atelier Héritage</p>
              <div className="mx-auto mt-5 flex max-w-[230px] items-center gap-3 text-[#8b5a24] sm:mt-6 sm:gap-4">
                <span className="h-px flex-1 bg-[#b58a55]/45" />
                <span>◆</span>
                <span className="h-px flex-1 bg-[#b58a55]/45" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 border-b border-[#b58a55]/25 text-center text-[10px] uppercase tracking-[0.12em] min-[380px]:text-[11px] sm:mt-8 sm:text-xs sm:tracking-[0.14em]">
              <span className="border-b-2 border-[#8b5a24] pb-3 font-semibold">Connexion</span>
              <Link to="/signup" className="pb-3 text-[#5f4a35] transition hover:text-[#17100b]">Créer un compte</Link>
            </div>

            <form onSubmit={loginUser} className="mt-5 space-y-4 sm:mt-7 sm:space-y-5">
              {message && (
                <p role="alert" className="rounded-sm border border-red-900/30 bg-red-950/10 px-4 py-3 text-left text-sm text-red-900">
                  {message} Vous pouvez vérifier votre e-mail ou réessayer dans un instant.
                </p>
              )}

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs" htmlFor="login-email">E-mail</label>
                <div className="login-field">
                  <span className="login-field-icon" aria-hidden="true">
                    <Mail size={19} />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    placeholder='Entrez votre adresse e-mail'
                    value={email}
                    required
                    disabled={isSubmitting}
                    aria-invalid={message ? 'true' : 'false'}
                    autoComplete="email"
                    className='login-input'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs" htmlFor="login-password">Mot de passe</label>
                <div className="login-field">
                  <span className="login-field-icon" aria-hidden="true">
                    <Lock size={19} />
                  </span>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Entrez votre mot de passe'
                    value={password}
                    required
                    disabled={isSubmitting}
                    aria-invalid={message ? 'true' : 'false'}
                    autoComplete="current-password"
                    className='login-input'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    disabled={isSubmitting}
                    className="login-password-toggle"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <div className='flex w-full flex-col gap-3 text-xs min-[460px]:flex-row min-[460px]:items-center min-[460px]:justify-between'>
                <div className='flex items-center'>
                  <input
                    id="remember-me"
                    type='checkbox'
                    disabled={isSubmitting}
                    className='mr-3 h-4 w-4 accent-[#5a3519] disabled:cursor-not-allowed disabled:opacity-60'
                  />
                  <label htmlFor="remember-me">Se souvenir de moi</label>
                </div>
                <button type="button" disabled={isSubmitting} className='whitespace-nowrap underline underline-offset-4 transition hover:text-[#8b5a24] disabled:cursor-not-allowed disabled:opacity-60'>Mot de passe oublié ?</button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className='login-submit group flex w-full cursor-pointer items-center justify-center gap-3 px-5 py-4 font-serif text-base uppercase tracking-[0.14em] shadow-lg transition disabled:cursor-not-allowed disabled:opacity-70 sm:gap-4 sm:px-6 sm:text-lg sm:tracking-[0.16em]'
              >
                {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </button>
            </form>

            <div className="mt-7">
              <div className="flex items-center gap-3 text-center text-[11px] uppercase tracking-[0.10em] text-[#5f4a35] sm:gap-4 sm:text-xs sm:tracking-[0.12em]">
                <span className="h-px flex-1 bg-[#b58a55]/35" />
                Ou continuer avec
                <span className="h-px flex-1 bg-[#b58a55]/35" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 min-[380px]:gap-3 sm:mt-5">
                {socialProviders.map(({ name, Icon }) => (
                  <button key={name} type="button" disabled={isSubmitting} className="login-social-button" aria-label={`Continuer avec ${name}`}>
                    <Icon className="login-social-icon" aria-hidden="true" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[#b58a55]/25 py-4 text-center text-[10px] text-[#3b2a1d] min-[380px]:text-[11px] sm:mt-7 sm:grid-cols-4 sm:gap-4 sm:py-5 xl:text-[12px]">
              {trustItems.map(([Icon, label]) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon size={22} />
                  <span className="leading-snug">{label}</span>
                </div>
              ))}
            </div>

            <blockquote className="mt-5 text-center font-serif text-lg italic leading-relaxed text-[#2d1c10] sm:mt-6 sm:text-xl">
              “L’élégance est la seule beauté qui ne se fane jamais.”
              <span className="mt-2 block font-aurore text-2xl text-[#5f3a1d] sm:mt-3 sm:text-3xl">Atelier Héritage</span>
            </blockquote>
          </div>
        </motion.section>
      </main>

      <div className="relative z-10 px-4 pb-7 text-center text-[11px] uppercase tracking-[0.12em] text-[#ead7b8] sm:px-5 sm:pb-8 sm:text-xs sm:tracking-[0.16em] lg:hidden">
        Nouveau ici ? <Link to="/signup" className="underline underline-offset-4 transition hover:text-[#c6a16b]">Créez votre compte</Link>
      </div>
    </div>
  );
}

export default Login;
