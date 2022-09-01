import React, { useState, useEffect } from 'react'

import { getToken, getSpotifyArtist, getSpotifyArtists } from '../apiClient'
import artists from '../data/artists'

function App() {
  const [token, setToken] = useState('')
  const [artist, setArtist] = useState('')
  const [manyArtists, setManyArtists] = useState([])

  useEffect(() => {
    getToken()
      .then((tokenObj) => {
        setToken(tokenObj.access_token)
        return getSpotifyArtist(tokenObj.access_token)
      })
      .then((artistObj) => {
        setArtist(artistObj.name)
      })

      .catch((err) => {
        console.error(err.message)
      })
  }, [])

  function getArtists() {
    getSpotifyArtists(token)
      .then(({ artists }) => {
        artists.map((element) => console.log(element.name))
        setManyArtists(artists)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  return (
    <>
      {/* <h1>{welcomeStatement}</h1> */}
      <h1>{'Spotiguys Project'}</h1>
      <h2>{artist}</h2>
      <button onClick={getArtists}>Get Artists</button>
      {manyArtists.map((element) => {
        return <p key={element.name}>{element.name}</p>
      })}
    </>
  )
}

export default App
