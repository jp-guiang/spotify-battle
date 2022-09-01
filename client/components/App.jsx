import React, { useState, useEffect } from 'react'

import { getToken, getSpotifyArtist } from '../apiClient'

function App() {
  const [token, setToken] = useState('')

  useEffect(() => {
    getToken()
      .then((tokenObj) => {
        console.log(tokenObj)
        setToken(tokenObj.access_token)
        return
      })
      .catch((err) => {
        // console.error(err.message)
        console.log('Pepega')
      })
  }, [])

  // useEffect(() => {
  //   console.log(token)
  //   getSpotifyArtist(token)
  //     .then((artist) => {
  //       console.log(artist)
  //     })
  //     .catch((err) => {
  //       // console.error(err.message)
  //       console.log('Artist pepe')
  //     })
  // }, [token])

  return (
    <>
      {/* <h1>{welcomeStatement}</h1> */}
      <h1>{'Pepe test'}</h1>
    </>
  )
}

export default App
