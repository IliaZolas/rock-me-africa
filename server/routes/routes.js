const express = require('express')
const router = express.Router()
const request = require('request');
const cheerio = require('cheerio');
const Twitter = require('twitter');

// Set up Twitter API client
const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    // Define the list of bands and their Twitter usernames
    const bands = [
    { name: 'OneDaySky', username: 'OneDaySky' },
    { name: 'St.Bloodbrother', username: 'StBloodbrother' }
    // ...and so on for the remaining 18 bands
    ];

    // Define the route handler for GET /news
    router.get('/app/news', async (req, res) => {
        console.log("get route triggered")
        try {
            const latestTweets = [];
        
            for (const band of bands) {
            const params = {
                screen_name: band.username,
                count: 1,
                exclude_replies: true,
                trim_user: true,
                tweet_mode: 'extended'
            };
            const tweets = await client.get('statuses/user_timeline', params);
        
            if (tweets.length > 0) {
                const tweet = tweets[0];
                const tweetText = tweet.full_text;
                const tweetUrl = `https://twitter.com/${band.username}/status/${tweet.id_str}`;
                const latestTweet = {
                name: band.name,
                profileImage: tweet.user.profile_image_url,
                text: tweetText,
                url: tweetUrl
                };
                latestTweets.push(latestTweet);
            }
            }
        
            res.json(latestTweets);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching the latest tweets.');
        }
    });

module.exports = router