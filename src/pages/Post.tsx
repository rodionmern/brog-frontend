import api from "../api/api";
import React, { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';

interface Post {
    content: string;
    createdAt: string;
    id: number;
    title: string;
}

const Post = () => {
    const location = useLocation()
    const responsePath = '/posts' + location.pathname
    const [postData, setPostData] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    console.log(responsePath)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(responsePath)
                setPostData({...postData, ...response.data})
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [responsePath]);
    console.log(postData)
    if (loading) return <div>Loading...</div>;
    if (!postData) return <div>No post found</div>;
    return (
        <div className="post">
            <h2>{postData.title}</h2>
            <p>{postData.content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < postData.content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ))}</p>
            <p>{postData.createdAt}</p>
        </div>
    );
}

export default Post