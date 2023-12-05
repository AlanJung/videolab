const express = require('express')
const db = require('./db')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/videos', async (req, res) => {

const videos = await db('video').select('*')

  res.json(videos)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', async (req, res) => {
    const query = req.query.text

    const videos = await db('video').select('*').whereILike('title', `%${query}%`)

  res.json(videos)
})






app.listen(3000, () => {
  console.log('Express app listening on port 3000!')
})