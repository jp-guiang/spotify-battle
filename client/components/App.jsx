import React, { useState, useEffect } from 'react'

import { getToken, getSpotifyArtist } from '../apiClient'

function App() {
  const [token, setToken] = useState('')
  const [artist, setArtist] = useState('')

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

  return (
    <>
      {/* <h1>{welcomeStatement}</h1> */}
      <h1>{'Spotiguys Project'}</h1>
      <h2>{artist}</h2>
    </>
  )
}

export default App
