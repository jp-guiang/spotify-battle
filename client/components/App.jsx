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
    //only pass in the two artists, arist query can be diff variable
    const twoArtists = ['6eUKZXaKkcviH0Ku9w2n3V', '66CXWjxzNUsdJxJ2JdwvnR']
    spotifyAllArtists(token, twoArtists)
      .then(({ artists }) => {
        // artists.map((element) => console.log(element.images))

        setAllArtists(artists)
        if (artists[0].popularity > artists[1].popularity) {
          setWinner(1)
        } else if (artists[1].popularity > artists[0].popularity) {
          setWinner(2)
        } else if (artists[1].popularity === artists[0].popularity) {
          setWinner(3)
        }
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
  console.log(winner)
  let winnerStatus = ''
  if (winner === 0) {
    winnerStatus = ''
  } else if (winner === 1) {
    winnerStatus = `The more popular artist is ${allArtists[0].name}`
  } else if (winner === 2) {
    winnerStatus = `The more popular artist is ${allArtists[1].name}`
  } else if (winner === 3) {
    winnerStatus = `The artists are equally popular!`
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

      <form onSubmit={handleSubmit}>
        <input></input>
        <input type="submit" />
        <input></input>
      </form>

      {allArtists.map((element) => {
        return (
          <div key={element.uri}>
            <p>Artist Name: {element.name}</p>
            <img src={element.images[1].url} height="200px" alt="artist" />
            <p>Popularity: {element.popularity}</p>
          </div>
        )
      })}
      <h1>{winnerStatus}</h1>
    </>
  )
}

export default App
