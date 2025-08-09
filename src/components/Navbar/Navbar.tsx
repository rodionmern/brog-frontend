import './Navbar.css'

import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav>
            <Link to='/'>Главная</Link>
            <Link to='/login'>Админка</Link>
        </nav>
    )
}

export default Navbar