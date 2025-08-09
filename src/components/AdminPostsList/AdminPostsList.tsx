import './AdminPostsList.css'

import axios from "axios"
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
                const responce: any = await axios.get('http://localhost:4200/api/posts')
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

    const deletePost = (postId: any) => {
        console.log(postId);
        api.delete(`/posts/delete/${postId}`);
    }

    return (
        <div>
            <div className="deletePost">
                <input 
                    value={postId} 
                    placeholder="Id поста на удаление" 
                    onChange={(e) => setPostId(e.target.value)}/>
                <button onClick={() => deletePost(postId)}>Удалить пост</button>
            </div>
            {posts && posts.length > 0 ? (
                posts.map((post: Post) => (
                    <div key={post.id}>
                        <p>id: {post.id}, title: {post.title}</p>
                    </div>
                ))
            ) : (
                <div>No posts found</div>
            )}
        </div>
    )
}

export default AdminPostsList