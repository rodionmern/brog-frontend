import './AdminPostsList.css'

import { useEffect, useState } from "react"
import api from "../../api/api";

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const AdminPostsList = () => {
    const [postId, setPostId] = useState('')

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const responce: any = await api.get('/posts')
                const sortedPosts:any = [...responce.data].sort((a, b) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
                setPosts(sortedPosts)
            } catch (err) {
                setError("Failed to fetch posts")
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    const deletePost = (postId: Number) => {
        api.delete(`/posts/delete/${postId}`);
    }

    return (
        <div className='adminpostlist'>
            <div className="deletePost">
                <input 
                    value={postId} 
                    type="number"
                    placeholder="Id поста на удаление" 
                    onChange={(e) => setPostId(e.target.value)}
                    className='post-input'/>
                <button 
                    onClick={() => deletePost(Number(postId))}
                    className='post-button'>Удалить пост</button>
            </div>
            <div className="posts">
                {posts && posts.length > 0 ? (
                    posts.map((post: Post) => (
                        <p key={post.id} className='post'>id: {post.id}, title: {post.title}</p>
                    ))
                ) : (
                    <div>No posts found</div>
                )}
            </div>
        </div>
    )
}

export default AdminPostsList