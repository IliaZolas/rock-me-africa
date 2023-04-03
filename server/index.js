const PORT = 4000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

// URLs of the websites to scrape
const urls = [
  'https://www.samusicnews.co.za/',
  'https://www.undergroundpress.co.za/'
];

// Scrape data from each website
const scrapeData = async () => {
  for (const url of urls) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Extract the data you need using Cheerio selectors
      const title = $('h1').text();
      const post = $('p').text();
      const link = $('a').text();

      // Do something with the extracted data
      console.log(`Post Title: ${title}`);
      console.log(`Post Excerpt: ${post}`);
      console.log(`Post Excerpt: ${link}`);
    } catch (error) {
      console.error(`Error scraping ${url}: ${error.message}`);
    }
  }
};

// Run the scraper
scrapeData();


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))