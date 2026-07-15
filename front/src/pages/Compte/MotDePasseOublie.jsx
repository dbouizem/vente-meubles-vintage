import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/auth';
function MotDePasseOublie() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      setResult(await forgotPassword(email));
    } catch (requestError) {
      setError(requestError.message);
    }
  };
  return (
    <main className="mx-auto min-h-[70vh] max-w-xl px-4 py-14 text-[#24160e]">
      <section className="border border-[#dccbbd] bg-[#fbf1df] p-7">
        <h1 className="font-serif text-4xl uppercase">Mot de passe oublié</h1>
        <p className="mt-3 text-sm text-[#5f4a35]">Saisissez l’e-mail associé à votre compte.</p>
        <form onSubmit={submit} className="mt-6">
          <label className="text-xs" htmlFor="forgot-email">
            E-mail
          </label>
          <input
            id="forgot-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full border border-[#b58a55] bg-white p-3"
          />
          <button className="mt-4 w-full cursor-pointer bg-[#17100b] p-3 text-xs uppercase text-white">
            Préparer la réinitialisation
          </button>
        </form>
        {error && (
          <p role="alert" className="mt-4 text-red-700">
            {error}
          </p>
        )}
        {result && (
          <div role="status" className="mt-4 text-sm">
            <p>{result.message}</p>
            {result.resetToken && (
              <Link
                className="mt-3 inline-block underline"
                to={`/reset-password?token=${result.resetToken}`}
              >
                Continuer en environnement local
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
export default MotDePasseOublie;
