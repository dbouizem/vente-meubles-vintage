import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  HelpCircle,
  Lock,
  Mail,
  Sparkles,
  User,
} from 'lucide-react';
import BACKGROUND_IMAGE from "./img.jpg";
import { apiUrl } from '../../config/api';
import './Signup.css';

const socialProviders = [
  { name: 'Google', Icon: GoogleIcon },
  { name: 'Apple', Icon: AppleIcon },
  { name: 'Pinterest', Icon: PinterestIcon },
];

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({});

  const passwordHelp = '8 caractères minimum, avec une majuscule, un chiffre et un symbole.';
  const passwordIsStrong = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

  const errors = useMemo(() => ({
    firstname: firstname.trim() ? '' : 'Le prénom est requis.',
    name: name.trim() ? '' : 'Le nom est requis.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Entrez une adresse e-mail valide.',
    password: passwordIsStrong ? '' : passwordHelp,
    confirmPassword: confirmPassword === password ? '' : 'Les mots de passe ne correspondent pas.',
    terms: acceptedTerms ? '' : 'Vous devez accepter les conditions pour créer un compte.',
  }), [acceptedTerms, confirmPassword, email, firstname, name, password, passwordIsStrong]);

  const formIsValid = Object.values(errors).every((error) => !error);

  const markTouched = (field) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const fieldError = (field) => touched[field] ? errors[field] : '';

  const addUser = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccessMessage('');

    if (!formIsValid) {
      setTouched({
        firstname: true,
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        terms: true,
      });
      setMessage("Veuillez corriger les champs indiqués avant de créer votre compte.");
      return;
    }

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
        setSuccessMessage("Votre compte Atelier Héritage a été créé. Redirection vers la connexion...");
        setTimeout(() => navigate("/"), 900);
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
    <div className="signup-page relative min-h-dvh overflow-x-hidden bg-[#0b0907] font-ptMono text-[#ead7b8]">
      <img src={BACKGROUND_IMAGE} className="absolute inset-0 h-full w-full object-cover object-center" alt="" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(198,161,107,0.20),transparent_30%),linear-gradient(90deg,rgba(10,7,5,0.86),rgba(10,7,5,0.56)_45%,rgba(10,7,5,0.88))]" />

      <header className="relative z-20 grid gap-3 px-3 py-4 text-[10px] uppercase tracking-[0.16em] min-[380px]:px-4 sm:grid-cols-3 sm:items-center sm:px-10 sm:py-6 sm:tracking-[0.18em]">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-[#ead7b8] transition hover:text-[#c6a16b] focus-visible:outline-[#c6a16b] sm:gap-3">
          <ArrowLeft size={16} />
          Retour à la connexion
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

      <main className="relative z-10 grid gap-6 px-3 pb-7 min-[380px]:px-4 sm:px-8 sm:pb-10 lg:min-h-[calc(100dvh-96px)] lg:grid-cols-[minmax(620px,0.72fr)_minmax(280px,0.82fr)] lg:items-center lg:gap-12 lg:px-10 xl:grid-cols-[minmax(680px,820px)_minmax(420px,1fr)] xl:px-14">
        <motion.section
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
          className="signup-card mx-auto w-full max-w-[720px] text-[#1b120b] lg:ml-0 xl:ml-8"
          aria-labelledby="signup-title"
        >
          <div className="signup-card-frame">
            <div className="text-center">
              <Sparkles className="mx-auto text-[#8b5a24]" size={22} />
              <h1 id="signup-title" className="mt-3 font-serif text-4xl uppercase tracking-[0.08em] text-[#17100b] min-[380px]:mt-4 sm:text-5xl xl:text-6xl">Bienvenue</h1>
              <p className="mt-2 font-aurore text-2xl leading-none text-[#3b2412] sm:mt-3 sm:text-4xl">chez Atelier Héritage</p>
              <div className="mx-auto mt-5 flex max-w-[230px] items-center gap-3 text-[#8b5a24] sm:mt-6 sm:gap-4">
                <span className="h-px flex-1 bg-[#b58a55]/45" />
                <span>◆</span>
                <span className="h-px flex-1 bg-[#b58a55]/45" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 border-b border-[#b58a55]/25 text-center text-[10px] uppercase tracking-[0.12em] min-[380px]:text-[11px] sm:mt-8 sm:text-xs sm:tracking-[0.14em]">
              <Link to="/" className="pb-3 text-[#5f4a35] transition hover:text-[#17100b]">Connexion</Link>
              <span className="border-b-2 border-[#8b5a24] pb-3 font-semibold">Créer un compte</span>
            </div>

            <form onSubmit={addUser} className="mt-5 space-y-4 sm:mt-7" noValidate>
                {message && (
                  <p role="alert" className="signup-alert signup-alert-error">{message}</p>
                )}
                {successMessage && (
                  <p role="status" className="signup-alert signup-alert-success">{successMessage}</p>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <SignupField
                    id="signup-firstname"
                    label="Prénom"
                    placeholder="Votre prénom"
                    value={firstname}
                    disabled={isSubmitting}
                    autoComplete="given-name"
                    error={fieldError('firstname')}
                    onBlur={() => markTouched('firstname')}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <SignupField
                    id="signup-name"
                    label="Nom"
                    placeholder="Votre nom"
                    value={name}
                    disabled={isSubmitting}
                    autoComplete="family-name"
                    error={fieldError('name')}
                    onBlur={() => markTouched('name')}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <SignupField
                  id="signup-email"
                  label="Email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  disabled={isSubmitting}
                  autoComplete="email"
                  inputMode="email"
                  Icon={Mail}
                  error={fieldError('email')}
                  onBlur={() => markTouched('email')}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <SignupField
                  id="signup-password"
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  Icon={Lock}
                  error={fieldError('password')}
                  help={passwordHelp}
                  showToggle
                  toggleLabel={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  onToggle={() => setShowPassword((current) => !current)}
                  onBlur={() => markTouched('password')}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <SignupField
                  id="signup-confirm-password"
                  label="Confirmer le mot de passe"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmation"
                  value={confirmPassword}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  Icon={Lock}
                  error={fieldError('confirmPassword')}
                  showToggle
                  toggleLabel={showConfirmPassword ? 'Masquer la confirmation' : 'Afficher la confirmation'}
                  onToggle={() => setShowConfirmPassword((current) => !current)}
                  onBlur={() => markTouched('confirmPassword')}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />

                <div>
                  <label className="signup-terms">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      disabled={isSubmitting}
                      aria-invalid={fieldError('terms') ? 'true' : 'false'}
                      onBlur={() => markTouched('terms')}
                      onChange={(event) => setAcceptedTerms(event.target.checked)}
                    />
                    <span>
                      J’accepte les <a href="/conditions">Conditions Générales de Vente</a> et la <a href="/confidentialite">Politique de Confidentialité</a>.
                    </span>
                  </label>
                  {fieldError('terms') && <p className="signup-field-error">{fieldError('terms')}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="signup-submit group">
                  {isSubmitting ? 'Création du compte...' : 'Créer mon compte'}
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>
            </form>

            <div className="mt-7">
                <div className="signup-separator">
                  <span />
                  Ou s’inscrire avec
                  <span />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {socialProviders.map(({ name, Icon }) => (
                    <button key={name} type="button" disabled={isSubmitting} className="signup-social-button" aria-label={`S'inscrire avec ${name}`}>
                      <Icon className="signup-social-icon" aria-hidden="true" />
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
            </div>

            <p className="mt-7 text-center text-sm text-[#3b2a1d]">
                Vous avez déjà un compte ? <Link to="/" className="font-semibold underline underline-offset-4">Se connecter <ArrowRight size={14} className="inline" /></Link>
            </p>
          </div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="hidden min-h-[620px] flex-col justify-center lg:flex"
        >
          <div className="signup-quote-block">
            <p className="signup-quote-mark">“</p>
            <p className="signup-quote-text">
              Créer un compte, c’est entrer dans une maison de pièces choisies et d’histoires rares.
            </p>
            <p className="signup-quote-brand">Atelier Héritage</p>
            <span className="signup-quote-line" />
          </div>
        </motion.aside>
      </main>
    </div>
  );
}

function SignupField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  disabled,
  autoComplete,
  inputMode,
  Icon = User,
  error,
  help,
  showToggle = false,
  toggleLabel,
  onToggle,
  onBlur,
  onChange,
}) {
  return (
    <div>
      <label className="signup-label" htmlFor={id}>{label}</label>
      <div className="signup-field">
        <span className="signup-field-icon" aria-hidden="true">
          <Icon size={18} />
        </span>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          required
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${id}-help ${id}-error`}
          onBlur={onBlur}
          onChange={onChange}
        />
        {showToggle && (
          <button type="button" className="signup-password-toggle" onClick={onToggle} disabled={disabled} aria-label={toggleLabel}>
            {type === 'text' ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {help && <p id={`${id}-help`} className="signup-field-help">{help}</p>}
      {error && <p id={`${id}-error`} className="signup-field-error">{error}</p>}
    </div>
  );
}

export default Signup;
