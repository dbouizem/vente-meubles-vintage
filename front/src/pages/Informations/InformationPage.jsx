import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Mail } from 'lucide-react';
import { INFORMATION_PAGES } from './information-pages';

function InformationPage() {
  const { pathname } = useLocation();
  const page = INFORMATION_PAGES[pathname];
  if (!page) return null;
  return (
    <main id="main" className="bg-[#f8ecd4] px-4 py-10 text-[#24160e] sm:px-8">
      <article className="mx-auto max-w-5xl">
        <header className="border-b border-[#d8c5a7] pb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-[#7c2d12]">{page.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl uppercase leading-tight sm:text-6xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#5f4a35]">{page.intro}</p>
          <p className="mt-3 text-xs text-[#77624e]">Dernière mise à jour : 15 juillet 2026</p>
        </header>
        {page.warning && (
          <div
            role="note"
            className="mt-6 flex gap-3 border border-amber-800/40 bg-amber-50 p-4 text-sm leading-6 text-amber-950"
          >
            <AlertTriangle className="mt-0.5 shrink-0" size={18} />
            <p>{page.warning}</p>
          </div>
        )}
        <div className="mt-8 grid gap-x-10 lg:grid-cols-[220px_1fr]">
          <nav
            aria-label={`Sommaire de ${page.title}`}
            className="h-fit border border-[#d8c5a7] bg-[#fbf1df] p-5 lg:sticky lg:top-5"
          >
            <p className="text-xs uppercase tracking-[0.16em]">Sommaire</p>
            <ol className="mt-4 space-y-3 text-sm text-[#5f4a35]">
              {page.sections.map(([title], index) => (
                <li key={title}>
                  <a
                    href={`#section-${index + 1}`}
                    className="transition-colors hover:text-[#7c2d12]"
                  >
                    {index + 1}. {title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div>
            {page.sections.map(([title, text], index) => (
              <section
                id={`section-${index + 1}`}
                key={title}
                className="scroll-mt-6 border-b border-[#d8c5a7] py-7 first:pt-0"
              >
                <h2 className="font-serif text-2xl uppercase">{title}</h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5f4a35]">{text}</p>
              </section>
            ))}
          </div>
        </div>
        <aside className="mt-9 flex flex-col gap-4 border border-[#d8c5a7] bg-[#fbf1df] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 font-serif text-xl uppercase">
              <Mail size={18} /> Une question ?
            </p>
            <p className="mt-2 text-sm text-[#5f4a35]">
              Nous pouvons préciser ces informations avant votre réservation.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#17100b] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[#f8ecd4]"
          >
            Nous contacter <ArrowRight size={15} />
          </Link>
        </aside>
      </article>
    </main>
  );
}
export default InformationPage;
