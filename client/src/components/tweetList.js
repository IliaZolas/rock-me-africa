import React from 'react';
import Card from './cards';

const TweetList = ({ tweets }) => {
    return (
    <div className="tweet-list">
        {tweets.map((tweet) => (
        <Card
            key={tweet.date}
            date={tweet.date}
            user={tweet.User}
            tweet={tweet.Tweet}
            tweetLink={tweet['Tweet Link']}
            imageUrl={tweet['Image URL']}
        />
        ))}
    </div>
    );
};

export default TweetList;