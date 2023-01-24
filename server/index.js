const PORT = 4000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://widget.rss.app/v1/wall.js'

app.get('/', function (req, res) {
    res.json('webscraper running')
})

app.get('/results', async (req, res) => {
    try {
        const {data} = await axios(url)
        const $ = cheerio.load(data)
        const articles = []

        $('rssapp-wall', data).each(function () { 
            const text = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                text,
                url
            })
        })
        res.json(articles)
    } catch (err) {
        console.log(err)
    }
})

// app.get('/results', (req, res) => {
//     axios(url)
//         .then(response => {
//             const html = response.data
//             const $ = cheerio.load(html)
//             const articles = []

//             $('h2', html).each(function () { 
//                 const title = $(this).text()
//                 const url = $(this).find('a').attr('href')
//                 articles.push({
//                     title,
//                     url
//                 })
//             })
//             res.json(articles)
//         }).catch(err => console.log(err))

// })


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))