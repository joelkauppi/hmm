import React, { useState, useEffect } from 'react';
import axios from 'axios'

const ShowWeather = ({weather}) => {
  return (
    <div>
      <div>
        <b>Temperature: </b>{weather.current.temperature}
      </div>
      <div>
      {weather.current.weather_icons.map(iconURL => 
         <img key={iconURL}src={iconURL} alt="weather icon"/>
      )}
      </div>
      
      <b>Wind:</b>{weather.current.wind_speed} direction: {weather.current.wind_dir}

    </div>
  )
}

const Weather = ({countryName}) => {
  const [data, setData ] = useState()
  //huom environment variable needs to be set like this: 
  //set "REACT_APP_API_KEY=74ea2b3c5a0706d1dc484081d215de1d" && npm start
  const api_key = process.env.REACT_APP_API_KEY
  const requestURL = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + countryName
  useEffect( () => {
    axios
      .get(requestURL)    
      .then( response => {  
        setData(response.data)
      }
      )

  }, [requestURL])
  
    if (data) {
      return (
        <div>
          <ShowWeather weather={data}/>
        </div>
      )
    } else {
      return(
      <div>
        "rendering..."
      </div>
      )
    } 
}

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <div>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(lan =>
            <li key={lan.name}>{lan.name}</li>
            )}
        </ul>
      </div>
      <img src={country.flag} width="100px" alt="img"></img>
      <h3>Weather in {country.capital}</h3>
      <Weather countryName={country.name}/>
    </div>
  )

}

const Countries = ({countries, filterValue, setFilterValue} ) => {
 const countryList= countries.filter(country => 
    country.name.toUpperCase().includes(filterValue.toUpperCase())
  )
  
  const showSingleCountry = (cnt) => {
    setFilterValue(cnt)
  }

  if (countryList.length > 10) {
    return (  
      <b>Too many matches. Please specify another filter</b>
    )
  } else if (countryList.length < 10 && 1 < countryList.length) {
    return(
    <ul>
      {countryList.map(country => 
      <li key={country.name}>
        {country.name}
        <button onClick={() => showSingleCountry(country)}>Show</button>
      </li> )}
    </ul>
    )
  } else if (countryList.length === 1) {
    const country = countryList[0]
    return (
      <Country country={country}/>
    )
  }
  else {
    return (
      <b>No matches</b>
    )
  }
  

  }


const Filter = ({filterChange, filterValue}) => {
  return (
  <div>
    Find countries <input onChange={filterChange} value={filterValue} />
  </div>
  )
}

function App() {
  const [ countries, setCountries] = useState([])
  const [ filterValue, setFilterValue] = useState('')

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')    
      .then( response => {
        console.log(response.data)
        setCountries(response.data)
      }
      )

  }, [])

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const handleShowRequest = (country) => {
    setFilterValue(country.name)
  }

  return (
   <div>
     <Filter filterChange={handleFilterChange} filterValue={filterValue}/>

     <Countries filterValue={filterValue} countries={countries} setFilterValue={handleShowRequest} />
   </div>
  )
}

export default App;
