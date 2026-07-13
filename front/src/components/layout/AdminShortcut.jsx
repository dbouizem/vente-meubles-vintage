import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Link } from 'react-router-dom';

function AdminShortcut({ admin }) {
  if (!admin) {
    return null;
  }

  return (
    <span>
      <Link to="/admin" className="text-[#d8bc86]" aria-label="Accéder à l'administration">
        <SupervisorAccountIcon className="text-[28px]" />
      </Link>
    </span>
  );
}

export default AdminShortcut;
