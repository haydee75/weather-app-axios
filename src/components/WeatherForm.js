import React, { Fragment } from "react";

const WeatherForm = props => {
  return (
    <Fragment>
      <form onSubmit={props.getWeather}>
        <input type="text" name="city" placeholder="Enter a city" />
        &nbsp;
        <input type="text" name="country" placeholder="Enter a country" />
        &nbsp;
        <button>Submit</button>
      </form>
    </Fragment>
  );
};

export default WeatherForm;
