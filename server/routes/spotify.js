const express = require('express')
const router = express.Router()

const request = require('superagent')
require('dotenv').config()

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
      console.log(response)
      res.json(response.body)
    })
})

router.post('/artist', (req, res) => {
  const { token } = req.body
  console.log('Token from route:', token)
  return request
    .get('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg')
    .set({ Authorization: ` Bearer ${token}` })
    .set({ 'Content-Type': 'application/json' })

    .then((response) => {
      console.log(response.body)
      res.json(response.body)
    })
})

module.exports = router
