import React, { Component } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm";
import axios from "axios";

const Api_Key = "bf117d6be72980b0a0fe50aa56a75fe9";
//`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`

class App extends Component {
  state = {
    city: null,
    country: null,
    temperature: null,
    description: null,
    humidity: null,
    temp_min: null,
    temp_max: null,
    icon: null
  };
  getWeather = event => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    if (city && country) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
        )
        .then(res => {
          console.log(res);
          const temperature = res.data.main.temp;
          const description = res.data.weather[0].description;
          const icon = res.data.weather[0].icon;
          const humidity = res.data.main.humidity;
          const temp_min = res.data.main.temp_min;
          const temp_max = res.data.main.temp_max;
          let kelvinToCelsius = temperature - 273.15;
          let celsiusTemperature = parseInt(kelvinToCelsius);
          this.setState({
            temperature: celsiusTemperature,
            description,
            humidity,
            temp_min,
            temp_max,
            city,
            country,
            icon
          });
        });
    } else return;
  };

  render() {
    const icon = `http://openweathermap.org/img/w/${this.state.icon}.png`;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather App with Axios</h1>
          <WeatherForm getWeather={this.getWeather} />
          {this.state.temperature ? (
            <div>
              <h2>
                {this.state.city}, {this.state.country}
              </h2>
              <p className="description">{this.state.description}</p>
              <p className="temperature">{this.state.temperature} °C</p>
              <img className="weatherIcon" src={icon} />
              <p className="detail">
                <span>
                  <b>Humidity</b> <br /> {this.state.humidity} %
                </span>
                <span>
                  <b>Min</b> <br /> {this.state.temp_min} °C
                </span>
                <span>
                  <b>Max</b> <br /> {this.state.temp_max} °C
                </span>
              </p>
            </div>
          ) : (
            <p>Please enter a city and a country</p>
          )}
        </header>
      </div>
    );
  }
}

export default App;
