const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
require('dotenv').config();

const igUserId = '1009880337';
const accessToken = process.env.INSTAGRAM_BASIC_TOKEN;
const apiBaseUrl = 'https://graph.instagram.com/v16.0';

router.get('/instagram/posts', async (req, res) => {
  try {
    // Construct the URL for the Instagram API request
    const url = `${apiBaseUrl}/${igUserId}/media?fields=caption,media_url,permalink,thumbnail_url,username&access_token=${accessToken}`;

    // Make the request to the Instagram API
    const response = await axios.get(url);

    // Return the Instagram data as the response
    res.send(response.data);
    console.log("URL:",url);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving Instagram data');
  }
  console.log(accessToken);
});

module.exports = router;
