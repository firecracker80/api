import React from 'react';

class Weather extends React.Component {


  render() {
    return (
      this.props.cityFind.map((day, idx) => (
        <>
          <ul>
            <li key={idx}><b>Date:</b> {day.date}</li>
            <li key={idx}><b>Description:</b> {day.description}</li>
          </ul>
        </>
      ))
    )
  }

};

export default Weather;
