import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import PostForm from "../components/PostForm/PostForm"
import AdminPostsList from "../components/AdminPostsList/AdminPostsList"

const Admin = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login')
            }
        }
        checkToken()
    }, [navigate])
    
    return (
        <>
        <PostForm/>
        <AdminPostsList/>
        </>
    )
}

export default Admin