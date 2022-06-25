import React from 'react';

class Weather extends React.Component {


  render() {
    return (
      this.props.cityFind.map((day, idx) => {
        return(
       <WeatherDay
       day={day}
       key={idx}/>
       )})
    )
  }

};

class WeatherDay extends React.Component{

  render(){
    
    return(
      <>
      <ul>
        <li><b>Date:</b> {this.props.day.date}</li>
        <li><b>Description:</b> {this.props.day.description}</li>
      </ul>
    </>
    )}
}

export default Weather;
