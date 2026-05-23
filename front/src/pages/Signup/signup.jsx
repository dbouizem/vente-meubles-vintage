import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import {
  ArrowRight,
  Eye,
  Gem,
  KeyRound,
  Lock,
  Mail,
  Scissors,
  Ticket,
  User,
} from 'lucide-react';
import COVER_IMAGE from "./img.jpg";
import PANORAMA_IMAGE from "./imageSup.jpg";
import { apiUrl } from '../../config/api';
import './Signup.css';

const benefits = [
  {
    Icon: KeyRound,
    title: 'Accès privilégié',
    text: 'Découvrez nos nouveautés en avant-première.',
  },
  {
    Icon: Gem,
    title: 'Pièces uniques',
    text: 'Accédez à des pièces rares et éditions limitées.',
  },
  {
    Icon: Scissors,
    title: 'Expérience personnalisée',
    text: 'Des conseils sur-mesure et un service dédié.',
  },
  {
    Icon: Ticket,
    title: 'Invitations privées',
    text: 'Participez à nos événements et ventes confidentielles.',
  },
];

const socialProviders = [
  { name: 'Apple', Icon: AppleIcon },
  { name: 'Google', Icon: GoogleIcon },
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
    <div className="signup-page min-h-dvh overflow-x-hidden bg-[#0b0907] font-ptMono text-[#2a190e]">
      <main className="grid min-h-dvh lg:grid-cols-[48fr_52fr]">
        <motion.aside
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="signup-atelier-panel relative order-2 min-h-[540px] overflow-hidden border-[#b58a55]/45 lg:order-1 lg:min-h-dvh lg:border"
        >
          <img src={COVER_IMAGE} className="absolute inset-0 h-full w-full object-cover" alt="Atelier artisanal sombre avec mobilier vintage" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_26%,rgba(198,161,107,0.28),transparent_30%),linear-gradient(180deg,rgba(11,8,5,0.35),rgba(11,8,5,0.92)),linear-gradient(90deg,rgba(11,8,5,0.75),rgba(11,8,5,0.18))]" />
          <div className="signup-film-grain" aria-hidden="true" />

          <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10 lg:p-12">
            <div>
              <div className="signup-monogram" aria-label="Atelier Héritage Paris">
                <span>AH</span>
                <small>Atelier Héritage Paris</small>
              </div>

              <blockquote className="mt-12 max-w-[300px] font-serif text-3xl leading-tight text-[#f7e3bd] sm:mt-16 sm:text-4xl">
                “Créer, c’est transmettre l’âme du temps.”
                <span className="mt-5 block font-aurore text-3xl text-[#d8bc86]">Atelier Héritage</span>
              </blockquote>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' }}
              className="signup-benefits-card mt-10 max-w-[360px]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#4a2a14]">En rejoignant Atelier Héritage</p>
              <div className="mt-6 space-y-5">
                {benefits.map(({ Icon, title, text }) => (
                  <div key={title} className="signup-benefit">
                    <Icon size={25} />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.aside>

        <motion.section
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
          className="signup-form-panel relative order-1 flex min-h-dvh items-center justify-center px-3 py-6 sm:px-6 lg:order-2 lg:px-10 lg:py-10"
          aria-labelledby="signup-title"
        >
          <div className="signup-certificate relative w-full max-w-[720px]">
            <motion.div
              className="signup-wax-seal"
              whileHover={{ rotate: -3, scale: 1.03 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              AH
            </motion.div>

            <div className="signup-stamp" aria-hidden="true">AH<br />Paris</div>

            <div className="signup-form-frame">
              <div className="text-center">
                <div className="signup-ornament" aria-hidden="true" />
                <p className="mt-6 font-serif text-2xl italic text-[#4f3018]">Rejoignez l’univers</p>
                <h1 id="signup-title" className="mt-2 font-serif text-4xl uppercase leading-none tracking-[0.06em] text-[#1b120b] sm:text-5xl">
                  Atelier Héritage
                </h1>
                <div className="mx-auto mt-4 flex max-w-xs items-center gap-4 text-xs uppercase tracking-[0.45em] text-[#6f461f]">
                  <span className="h-px flex-1 bg-[#b58a55]/60" />
                  Paris
                  <span className="h-px flex-1 bg-[#b58a55]/60" />
                </div>
                <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#4f3b2a]">
                  Créez votre compte et accédez à un monde où l’élégance intemporelle prend vie.
                </p>
              </div>

              <form onSubmit={addUser} className="mt-8 space-y-4" noValidate>
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
                  placeholder="Créez votre mot de passe"
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
                  placeholder="Confirmez votre mot de passe"
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

                <button type="submit" disabled={isSubmitting || !formIsValid} className="signup-submit group">
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

              <p className="mt-8 text-center text-sm text-[#3b2a1d]">
                Vous avez déjà un compte ? <Link to="/" className="font-semibold underline underline-offset-4">Se connecter <ArrowRight size={14} className="inline" /></Link>
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      <section className="signup-postcard relative overflow-hidden border-t border-[#b58a55]/25 px-5 py-9 text-center">
        <img src={PANORAMA_IMAGE} className="absolute inset-0 h-full w-full object-cover" alt="" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#e8d1ad]/80" />
        <div className="signup-postmark" aria-hidden="true">Atelier<br />Héritage</div>
        <p className="relative z-10 mx-auto max-w-xl font-serif text-2xl leading-tight text-[#21140b] sm:text-3xl">
          Plus qu’une maison,<br /> une histoire que nous écrivons ensemble.
        </p>
      </section>
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
            <Eye size={18} />
          </button>
        )}
      </div>
      {help && <p id={`${id}-help`} className="signup-field-help">{help}</p>}
      {error && <p id={`${id}-error`} className="signup-field-error">{error}</p>}
    </div>
  );
}

export default Signup;
