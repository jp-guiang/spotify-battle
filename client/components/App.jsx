import React, { useState, useEffect } from 'react'

import { getToken, getArtist, spotifyAllArtists } from '../apiClient'
import artists from '../data/artists'

function App() {
  const [token, setToken] = useState('')
  const [artist, setArtist] = useState('')
  const [allArtists, setAllArtists] = useState([])

  useEffect(() => {
    getToken()
      .then((tokenObj) => {
        setToken(tokenObj.access_token)
        return getArtist(tokenObj.access_token)
      })
      .then((artistObj) => {
        setArtist(artistObj.name)
      })

      .catch((err) => {
        console.error(err.message)
      })
  }, [])

  function getAllArtists() {
    spotifyAllArtists(token)
      .then(({ artists }) => {
        artists.map((element) => console.log(element.name))
        setAllArtists(artists)
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
      <button onClick={getAllArtists}>Get Artists</button>
      {allArtists.map((element) => {
        return <p key={element.name}>{element.name}</p>
      })}
    </>
  )
}

export default App
