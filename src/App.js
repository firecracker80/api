/* eslint-disable no-undef */
import './App.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Movies from './Movies';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityFind: null,
      cityMap: '',
      error: false,
      errorMessage: '',
      cityInfo: '',
      cityMovies: []

    }
  }

  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })

  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let url = (`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      let cityFind = await axios.get(url);
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityFind.data[0].lat},${cityFind.data[0].lon}&zoom=12`;
      // let cityInfoUrl = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=d7c674b52ef6496faff8efb5d2c236d7&lang=en&units=I&days=5&lat=47.60621&lon=-122.33207`);
      let cityInfoUrl = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`, {params: {lat: cityFind.data[0].lat, lon: cityFind.data[0].lon}});
      let movieUrl = await axios.get(`${process.env.REACT_APP_SERVER}/movie?searchQuery=${this.state.city}`);
      console.log(cityInfoUrl);
      this.setState({
        cityFind: cityFind.data[0],
        cityMap: cityMap,
        cityInfo: cityInfoUrl,
        cityMovies: movieUrl
      })
    }

    catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error has occurred. Refresh the page and try again.`

      })
    }

  }

  render() {
    console.log(this.state.cityMap);

    return (
      <>
        <h1>Explore The City Of Your Next Adventure!</h1>
        <Form controlid="place_id" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Enter your city:</Form.Label>
            <Form.Control type="text" onInput={this.handleCityInput} />
            <Button variant="info" type="submit">EXPLORE!</Button>
          </Form.Group>
        </Form>
        {this.state.error}<Alert variant="info">{this.state.errorMessage}</Alert>

        {
          this.state.cityFind ?
            <Card border="info" style={{ width: '18rem' }} id='Card' onSubmit={this.handleSubmit}>
              <Card.Body>
                <Card.Title><b>City:</b> {this.state.cityFind.display_name}</Card.Title>
                <Card.Img variant="top" src={this.state.cityMap} />
                <Card.Text>
                  <b>Latitude:</b> {this.state.cityFind.lat}
                </Card.Text>
                <Card.Text>
                  <b>Longitude:</b> {this.state.cityFind.lon}
                </Card.Text>
                <Card.Text>
                  <b>Forecast:</b>
                </Card.Text>
                {this.state.cityInfo.data.map((day, idx) => {return <ul key={idx}><li><b>Date:</b> {day.date}</li><li><b>Description:</b> {day.description}</li></ul>})}
                <Card.Text>
                  <b>Associated Movies:</b>
                </Card.Text>
                <Movies
                  cityMovies={this.state.cityMovies.data}
                />
              </Card.Body>
            </Card> : <p>Please enter a city.</p>
        }
      </>
    )
  }
};


export default App;
