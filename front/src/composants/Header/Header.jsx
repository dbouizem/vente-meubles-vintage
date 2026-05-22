import './Header.css'
import PopupDiscount from '../PopupDiscount/PopupDiscount'
import { useState, useEffect } from 'react'

function Header() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  
  return (
    <>
          {showPopup && <PopupDiscount />}

    <section className='header flex flex-col bg-cover text-dark-brown min-h-[46vh] sm:min-h-[58vh] bg-center px-4'>
        <div className='text-center mx-auto mt-auto mb-auto py-4 px-6 bg-beige/90 max-w-3xl shadow-sm'>
          <h1 className='text-xl sm:text-2xl font-semibold tracking-wide'>Everything you need is already made!</h1>
        </div>
        
        <div className="mt-auto">
          <span className="inline-block">
          <a href="#main" aria-label="Aller à la liste des produits">
            <svg className="w-20 h-20 sm:w-28 sm:h-28 text-beige" fill="none" stroke="beige" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7">
            
              </path>
              
            </svg></a>
          </span>
        </div>
       

    </section>
    </>
  )
  
}

export default Header
