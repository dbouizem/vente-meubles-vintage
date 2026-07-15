import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function RouteFocus() {
  const { pathname } = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    if (previousPath.current !== null && previousPath.current !== pathname) {
      document.getElementById('main-content')?.focus();
    }
    previousPath.current = pathname;
  }, [pathname]);

  return null;
}

export default RouteFocus;
