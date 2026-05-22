import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Link } from 'react-router-dom'

function Icon_admin({admin}) {
    if (!admin) {
        return null;
    }

    return (
        <span>
                <Link to="/admin" className='text-dark-brown'>
                    <SupervisorAccountIcon className="text-[44px] sm:text-[70px]"/>
                </Link>
        </span>
    )
}

export default Icon_admin
