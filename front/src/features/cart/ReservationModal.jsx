import { useEffect, useCallback } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom';

export const ReservationModal = ({ showModal, setShowModal }) => {
  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reservation-title"
        >
          <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 text-center shadow-xl">
            <div className="text-[#2a435d] mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-beige">
              <CheckIcon />
            </div>
            <div className="text-sm space-y-4">
              <h1 id="reservation-title" className="text-2xl font-semibold text-dark-brown">
                Réservation confirmée
              </h1>
              <p>Vos meubles vous attendent en magasin</p>
              <p>Ada Vintage Boutique : 116 rue du faubourg</p>
              <Link to="/accueil">
                <button className=" p-3 mt-2 bg-dark-brown rounded-lg w-full text-white">
                  Revenir à l&apos;Accueil
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
