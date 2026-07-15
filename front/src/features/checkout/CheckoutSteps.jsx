const STEPS = [
  ['cart', 'Panier'],
  ['delivery', 'Livraison'],
  ['payment', 'Paiement'],
  ['confirmation', 'Confirmation'],
];

function CheckoutSteps({ current }) {
  const currentIndex = STEPS.findIndex(([id]) => id === current);
  return (
    <nav aria-label="Étapes de la commande" className="mx-auto mb-9 max-w-4xl">
      <ol className="grid grid-cols-4 border-y border-[#dccbbd] bg-[#fbf1df]">
        {STEPS.map(([id, label], index) => (
          <li
            key={id}
            aria-current={id === current ? 'step' : undefined}
            className={`px-1 py-4 text-center text-[9px] uppercase tracking-[0.08em] sm:text-xs sm:tracking-[0.14em] ${index <= currentIndex ? 'text-[#7c2d12]' : 'text-[#77624e]'}`}
          >
            <span
              className={`mx-auto mb-2 flex h-6 w-6 items-center justify-center rounded-full border ${index <= currentIndex ? 'border-[#7c2d12] bg-[#7c2d12] text-white' : 'border-[#b58a55]'}`}
            >
              {index + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default CheckoutSteps;
