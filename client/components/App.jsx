import React, { useState, useEffect } from 'react'

import { getToken, getArtist, spotifyAllArtists } from '../apiClient'
import artists from '../data/artists'

function App() {
  const [token, setToken] = useState('')
  const [artist, setArtist] = useState('')
  const [allArtists, setAllArtists] = useState([])
  const [artistQuery, setArtistQuery] = useState('')
  const [winner, setWinner] = useState(0)

  // get token on loading
  useEffect(() => {
    getToken()
      .then((tokenObj) => {
        setToken(tokenObj.access_token)
        return getArtist(tokenObj.access_token)
      })
      .then((artistObj) => {
        return setArtist(artistObj.name)
      })
      .then(() => {
        const test = getAllArtistsQuery(artists)
        return setArtistQuery(test)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, [])

  useEffect(() => {
    if (artistQuery != '') {
      getAllArtists()
    }
  }, [artistQuery])

  // get all artist on load

  function getAllArtistsQuery(listOfArtists) {
    let artistIds = ''

    listOfArtists.map((element, index) => {
      if (index != listOfArtists.length - 1) {
        artistIds = artistIds.concat(element.id, ',')
      } else artistIds = artistIds.concat(element.id)
    })

    return artistIds
  }

  function getAllArtists() {
    spotifyAllArtists(token, artistQuery)
      .then(({ artists }) => {
        setAllArtists(artists)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  function handleSubmit(e) {
    e.preventDefault()
    spotifyAllArtists(token, artistQuery)
      .then(({ artists }) => {
        artists.map((element) => console.log(element.images))

        setAllArtists(artists)
        // if (artists[0].popularity > artists[1].popularity) {
        //   setWinner(1)
        // } else if (artists[1].popularity > artists[0].popularity) {
        //   setWinner(2)
        // }
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  return (
    <>
      {/* <h1>{welcomeStatement}</h1> */}
      <h1>{'Spotiguys Project'}</h1>

      {allArtists.map((element) => {
        return (
          <p key={element.name}>
            {element.name} {element.id}
          </p>
        )
      })}

      {allArtists.map((element) => {
        return (
          <div key={element.uri}>
            <p>Artist Name: {element.name}</p>
            <img src={element.images[1].url} height="200px" alt="artist" />
            <p>Popularity: {element.popularity}</p>
          </div>
        )
      })}
      <form onSubmit={handleSubmit}>
        <input></input>
        <input type="submit" />
        <input></input>
      </form>
    </>
  )
}

export default App
