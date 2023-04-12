const express = require('express')
const router = express.Router()

const usernames = ['username1', 'username2', 'username3'];
const accessToken = process.env.INSTAGRAM_BASIC_TOKEN
const apiBaseUrl = "https://graph.instagram.com/v12.0";

router.get('/instagram/posts', async (req, res) => {
  try {
    // Construct the URL for the Instagram API request
    const url = `${apiBaseUrl}/user/media?fields=caption,media_url,permalink,thumbnail_url,username&access_token=${accessToken}&${usernames.map(u => `username=${u}`).join('&')}`;

    // Make the request to the Instagram API
    const response = await axios.get(url);

    // Return the Instagram data as the response
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving Instagram data');
  }
});

module.exports = router