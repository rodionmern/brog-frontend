import './Navbar.css'

import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav>
            <Link to='/'>Главная</Link>
            <Link to='/admin' className='login-button'>⤤</Link>
        </nav>
    )
}

export default Navbar