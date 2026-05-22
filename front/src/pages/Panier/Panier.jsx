import { useContext, useState} from 'react';
import { panierContext, reductionContext } from '../../contexts';
import { Modal } from '../../composants/Modal/Modal';

function Panier() {

  const {panier, setPanier} = useContext(panierContext);

  const calculateSubtotal = (panier) => {
    const subtotal = panier.reduce((acc, item) => acc + parseFloat(item.prix), 0);
    return subtotal;
  };

  const subtotals = calculateSubtotal(panier)
  const promotionString = 'ADATECH'
  
  const promotion = useContext(reductionContext)
  const [promoMessage, setPromoMessage] = useState('');
  const [promoUpdated, setPromoUpdated] = useState('');
  const discount = promoUpdated === promotionString ? promotion : 0;


  const total = subtotals - discount

  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => {
      setShowModal(showModal=>!showModal);
  }

  const removeItemFromPanier = (itemIndex) => {
    setPanier((currentPanier) => currentPanier.filter((item, index) => index !== itemIndex));
  };

  const clearPanier = () => {
    setPanier([]);
  };

  const messageChange = (event) => {
    setPromoMessage(event.target.value);
  };

  const messagePress = (event) => {
    if (event.key === 'Enter') {
      setPromoUpdated(promoMessage.trim().toUpperCase());
    }
  };

  const applyPromo = () => {
    setPromoUpdated(promoMessage.trim().toUpperCase());
  };

  
  const codePromo = () => discount




  return (
    <>
 

<section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <header className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Panier</h1>
      </header>

      <div className="mt-8">
      {panier.map((item, index) => (
        <div key={`${item.id}-${index}`} className="mt-8 border-t border-gray-400 pt-8">
        <ul className="space-y-4">
          <li className="flex flex-col sm:flex-row sm:items-center gap-4">
            <img
              src={item.photo}
              className="h-16 w-16 rounded object-cover"
              alt={item.nom}
            />

            <div>
              <h3 className="text-base  text-gray-900">{item.nom}</h3>

            </div>

            <div className="flex w-full flex-1 items-center justify-between sm:justify-end gap-2 font-medium text-base">
              <p>{item.prix}€</p>
    

              <button className="text-gray-600 transition hover:text-red-600"
                onClick={() => removeItemFromPanier(index)}
              >
                <span className="sr-only">Supprimer</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>

        </ul>
        </div>
        ))}

        {panier.length > 0 && (
          <div className="mt-8 flex justify-end">
            <button
              className="rounded border border-gray-700 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
              onClick={clearPanier}
            >
              Vider le panier
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-end border-t border-gray-400 pt-8">
          <div className="w-full max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Sous-total</dt>
                <dd>{subtotals}€</dd>
              </div>

              <div className="flex justify-between">
                <dt>Taxes incluses</dt>
                <dd>20%</dd>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <dt>Code Promo</dt>
                <dd className="flex gap-2">
                  <input placeholder='Code Promo' value={promoMessage} onChange={messageChange} onKeyDown={messagePress} className='w-full text-left sm:text-right border-solid border-gray-800'></input>
                  <button type="button" className="rounded bg-gray-700 px-3 py-1 text-white" onClick={applyPromo}>OK</button>
                </dd>
                <dd>{codePromo()}€</dd>
              </div>

              <div className="flex justify-between !text-base font-medium ">
                <dt>Total</dt>
                <dd>{total}€</dd>
              </div>
            </dl>



            <div className="flex flex-col items-center justify-end">
              <button
               className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
               onClick={openModal}> Payer en boutique</button>
               <Modal showModal={showModal} setShowModal = {setShowModal} />
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </>
  )
}

export default Panier;
