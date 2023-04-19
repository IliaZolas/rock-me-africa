import React from 'react';
import "./cards.css"

const Card = ({ date, user, tweet, tweetLink, imageUrl }) => {
    const formattedDate = new Date(parseInt(date)).toLocaleString();

    return (
        <div className="card">
            {imageUrl && 
                <div className="card-image-container">
                    <img src={imageUrl} alt="tweet media" className='card-image'/>
                </div>
            }
            <div className="card-content">
                <div className="card-title">
                    {user}
                </div>
                <div className="card-handle">
                    @{user}
                </div>
                <div className="tweet-card-date">
                    {formattedDate}
                </div>
                <div className="tweet-card-tweet">
                    {tweet}
                </div>
                <div className="card-read-more">
                    <a href={tweetLink} target="_blank">Visit Source</a>
                </div>
            </div>
        </div>
    );
};

export default Card;
