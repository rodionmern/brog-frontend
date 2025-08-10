import api from "../api/api";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import About from "../components/About/About";

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const Home = () => {
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

    return (
        <>
        <About/>
        <div className="posts" style={{marginBottom: '100px'}} >
            {posts && posts.length > 0 ? (
                posts.map((post: Post) => (
                    <div key={post.id} className='post'>
                        <h2><Link to={`/${post.id}`}>{post.title}</Link></h2>
                        <p>{(post.content).substring(0,150).split('\n').map((line, index, arr) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < arr.length - 1 ? <br /> : '...'}
                            </React.Fragment>
                            ))}</p>
                        <small>{new Date(post.createdAt).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</small>
                    </div>
                ))
            ) : (
                <div>No posts found</div>
            )}
        </div>
        </>
    )
}

export default Home