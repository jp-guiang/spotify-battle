const express = require('express')
const router = express.Router()

const request = require('superagent')
require('dotenv').config()

// 'http://localhost:3000/api/v1/spotify'
router.get('/', (req, res) => {
  return request
    .post('https://accounts.spotify.com/api/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set(
      'Authorization',
      'Basic ' +
        Buffer.from(
          process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
        ).toString('base64')
    )
    .query({ grant_type: 'client_credentials' })
    .then((response) => {
      res.json(response.body)
    })
})

// 'http://localhost:3000/api/v1/spotify/artist'
router.post('/artist', (req, res) => {
  const { token } = req.body

  return request
    .get('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg')
    .set({ Authorization: ` Bearer ${token}` })
    .set({ 'Content-Type': 'application/json' })

    .then((response) => {
      res.json(response.body)
    })
})

// 'http://localhost:3000/api/v1/spotify/artist/all'
router.post('/artist/all', (req, res) => {
  const { token } = req.body

  return request
    .get('https://api.spotify.com/v1/artists')
    .set({ Authorization: ` Bearer ${token}` })
    .set({ 'Content-Type': 'application/json' })
    .query({
      ids: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
    })
    .then((response) => {
      res.json(response.body)
    })
})

module.exports = router
