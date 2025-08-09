import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
        <h1>404</h1>
        <h2>Страница не найдена!</h2>
        <h2><Link to='/'>⎆ Вернуться на главную</Link></h2>
        </>
    )
}

export default NotFound