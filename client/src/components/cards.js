import "./cards.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
        const res = await axios.get('http://localhost:4000/instagram/posts');
        setPosts(res.data.data); // assuming response from the server contains a 'data' property that contains the posts
        console.log("posts:", res.data.data);
        }
        getPosts();
    }, []);

    return (
        <div>
        {posts.map((post) => (
            <div key={post.id}>
            <img src={post.media_url} alt="Instagram post" />
            <h3>{post.username}</h3>
            <p>{post.caption}</p>
            </div>
        ))}
        </div>
    );
}

export default Card;
