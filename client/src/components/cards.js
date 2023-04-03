import "./cards.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = () => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        async function getTweets() {
        const res = await axios.get('/');
        setTweets(res.data);
        console.log("tweets:",res.data);
        }
        getTweets();
    }, []);


    return (
        <div>
        {tweets.map((tweet) => (
            <div key={tweet.url}>
                <img src={tweet.profileImage} alt="Band Profile" />
                <h3>{tweet.name}</h3>
                <p>{tweet.text}</p>
            </div>
            ))}
        </div>
    );
    }

export default Card;