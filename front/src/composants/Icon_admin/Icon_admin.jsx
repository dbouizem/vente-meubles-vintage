import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Link } from 'react-router-dom'

function Icon_admin({admin}) {
    if (!admin) {
        return null;
    }

    return (
        <span>
                <Link to="/admin" className='text-dark-brown' aria-label="Accéder à l'administration">
                    <SupervisorAccountIcon className="text-[40px] sm:text-[54px]"/>
                </Link>
        </span>
    )
}

export default Icon_admin
