import hotBg from "../src/assets/hot.jpg";
import coldBg from "../src/assets/cold.jpg";
import { useState } from "react";
import axios from 'axios'

function App() {

  const apiKey = '9ecc4defe763c16739e8274fadd1fb7f'
  const [inputCity,setInputCity] = useState("")
  
  const [data,setData] = useState({})

  const weatherDetails = (cityName) => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    axios.get(apiURL).then((resp) => {
      console.log("response",resp.data);
      setData(resp.data)
    }).catch((err) => {
      console.log("err",err);
    })
  }

    const handleChangeInput = (event) => {
      console.log(event.target.value);
      setInputCity(event.target.value)
    }

    const handleSearch = () => {
      weatherDetails(inputCity)
    }

  

  return (
    <div className="app" style={{ backgroundImage: ((data?.main?.temp)-273.15).toFixed(2)<20?`url(${coldBg})`:`url(${hotBg})` }}>
      <div className="overlay">
        <div className="container">
          <div className="section section__inputs">
            <form className="search" >
            <input type="text" name="city" value={inputCity} placeholder="Enter City..." onChange={handleChangeInput} />
            </form>
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="section section__temperature">
            <div className="description">
              <h3>{data?.name}</h3>
              <img className="weather-icon"
                src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
                alt="weather icon"
              />
              <h3>{data?.weather[0]?.main}</h3>
            </div>

            <div className="temperature">
              <h1>{((data?.main?.temp)-273.15).toFixed(2)} °C</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
