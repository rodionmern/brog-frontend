import './PostForm.css'

import { useState } from "react"
import api from "../../api/api"

const PostForm = () => {
    const [newPost, setNewPost] = useState({
        title: '', 
        content: '', 
    })

    const handleSubmit = () => {
        api.post('/posts/post', newPost, {
            headers: {

            }
        })
    }

    return (
        <div className="post-form">
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