import React from 'react';
import "./cards.css"

const Card = ({ date, user, tweet, tweetLink, imageUrl }) => {
    return (
        <div className="card">
            <div className="card-title">
                {user}
            </div>
            <div className="tweet-card-date">
                {new Date(date).toLocaleString()}
            </div>
            <div className="tweet-card-tweet">
                {tweet}
            </div>
            <div>
                {imageUrl && <img src={imageUrl} alt="tweet media" className='card-image'/>}
            </div>
            <div className="card-read-more">
                <a href={tweetLink}>View on Twitter</a>
            </div>
        </div>
    );
};

export default Card;
