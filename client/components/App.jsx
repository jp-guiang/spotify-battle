import React, { useState, useEffect } from 'react'

import { getToken, getArtist, spotifyAllArtists } from '../apiClient'
import artists from '../data/artists'

function App() {
  const [token, setToken] = useState('')
  const [artist, setArtist] = useState('')
  const [allArtistData, setAllArtistData] = useState([])
  const [artistQuery, setArtistQuery] = useState('')
  const [winner, setWinner] = useState(0)
  const [playerAnswers, setAnswers] = useState([])

  const initialFormData = {
    playerOne: '',
    playerTwo: '',
  }

  const [form, setForm] = useState(initialFormData)

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
        const artistIds = getAllArtistsQuery(artists)
        return setArtistQuery(artistIds)
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
        setAllArtistData(artists)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  function handleSubmit(e) {
    // let answersId = [{}]
    let subIds = ''

    subIds = subIds.concat(form.playerOne, ',', form.playerTwo)

    e.preventDefault()
    //only pass in the two artists, arist query can be diff variable

    spotifyAllArtists(token, subIds)
      .then(({ artists }) => {
        // answersId[0][name] = artists[0].name
        // console.log(answersId)
        setAnswers(artists)

        // setAllArtists(artists)
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

  let winnerStatus = ''
  if (winner === 0) {
    winnerStatus = ''
  } else if (winner === 1) {
    winnerStatus = `The more popular artist is ${playerAnswers[0].name}`
  } else if (winner === 2) {
    winnerStatus = `The more popular artist is ${playerAnswers[1].name}`
  } else if (winner === 3) {
    winnerStatus = `The artists are equally popular!`
  }

  function handleChange(e) {
    const { name, value } = e.target

    const newForm = {
      ...form,
      [name]: value,
    }
    setForm(newForm)
  }

  return (
    <>
      {/* <h1>{welcomeStatement}</h1> */}
      <h1>{'Spotiguys Project'}</h1>

      {allArtistData.map((element) => {
        return (
          <p key={element.name}>
            {element.name} {element.id}
          </p>
        )
      })}

      {playerAnswers.map((element) => {
        return (
          <div key={element.uri}>
            <p>Artist Name: {element.name}</p>
            <img src={element.images[1].url} height="200px" alt="artist" />
            <p>Popularity: {element.popularity}</p>
          </div>
        )
      })}

      <form onSubmit={handleSubmit}>
        <label htmlFor="playerOne">
          Player 1:
          <input
            id="playerOne"
            onChange={handleChange}
            name="playerOne"
            value={form.playerOne}
          ></input>
        </label>

        <label htmlFor="playerTwo">
          Player 2:
          <input
            id="playerTwo"
            onChange={handleChange}
            name="playerTwo"
            value={form.playerTwo}
          ></input>
          <input type="submit" />
        </label>
      </form>

      <h1>{winnerStatus}</h1>
    </>
  )
}

export default App
