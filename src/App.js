/* eslint-disable no-undef */
import './App.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityFind: {},
      cityMap: '',
      error: false,
      errorMessage: ''

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
      let cityMap = await `https://maps.locationiq.com/v3/staticmap?key=pk.579aac8209bc39c58f89e14dcc5a9a2b}&  center=${cityFind.data[0].lat}, ${cityFind.data[0].lon}&zoom=12`;
      this.setState({
        cityFind: cityFind.data[0],
        cityMap: cityMap
      })
    }

    catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error has occurred. Refresh the page and try again.`

      })
    }

    console.log(cityFind.data);
  }

  render() {

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
        <>
        <Card border="info" style={{ width: '18rem' }} id='Card' onSubmit={this.handleSubmit}>
          <Card.Body>
            <Card.Title>{cityFind.data[0].display_name}</Card.Title>
            <Card.Img variant="top" src={this.state.cityMap} />
            <Card.Text>
              {cityFind.data[0].lat}
              {cityFind.data[0].lon}
            </Card.Text>
          </Card.Body>
        </Card></>
      </>
    )
  }
};


export default App;
