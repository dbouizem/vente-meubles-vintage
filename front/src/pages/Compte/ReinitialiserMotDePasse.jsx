import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/auth';
function ReinitialiserMotDePasse() {
  const [params] = useSearchParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    try {
      const result = await resetPassword(params.get('token') || '', password);
      setMessage(result.message);
      setSuccess(true);
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <main className="mx-auto min-h-[70vh] max-w-xl px-4 py-14 text-[#24160e]">
      <section className="border border-[#dccbbd] bg-[#fbf1df] p-7">
        <h1 className="font-serif text-4xl uppercase">Nouveau mot de passe</h1>
        <form onSubmit={submit} className="mt-6">
          <label className="text-xs" htmlFor="reset-password">
            Mot de passe
          </label>
          <input
            id="reset-password"
            type="password"
            minLength="8"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full border border-[#b58a55] bg-white p-3"
          />
          <button className="mt-4 w-full cursor-pointer bg-[#17100b] p-3 text-xs uppercase text-white">
            Modifier le mot de passe
          </button>
        </form>
        {message && (
          <p role="status" className="mt-4 text-sm">
            {message}
          </p>
        )}
        {success && (
          <Link to="/" className="mt-4 inline-block underline">
            Retour à la connexion
          </Link>
        )}
      </section>
    </main>
  );
}
export default ReinitialiserMotDePasse;
