import './PostForm.css'

import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import api from "../../api/api"
import { logout } from '../../services/authService'

const PostForm = () => {
    const navigate = useNavigate()

    const [newPost, setNewPost] = useState({
        title: '', 
        content: '', 
    })
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        try {
            await api.post('/posts/post', newPost, {
                headers: {

                }
            })
        } catch (err) {
            if (err == 'AxiosError: Request failed with status code 400') {
                setError(`Время сессии окончилось, произвожу выход`);
                logout(); 
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(`${err}`)
            }
        }
    }

    return (
        <div className="post-form">
            <p className='error'>{error}</p>
            <input
                value={newPost.title} 
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder='Заголовок'
                className='post-input'
                required />
            <textarea
                value={newPost.content} 
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder='Описание'
                className='post-textarea'
                required />
            <button 
                onClick={handleSubmit}
                className='post-button'>Создать пост</button>
        </div>
    )
}

export default PostForm