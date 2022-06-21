/* eslint-disable no-undef */
import './App.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    city: '',
    cityFind: []

  }}

  handleCityInput = (e) => {
    e.preventDefault();
      this.setState({
        city: e.target.value
      })
    
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let url = (`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
    let cityFind = await axios.get(url);
  
    console.log(cityFind.data);
  }

  // toggleText = () => {
  //   let cityInfo = document.getElementById(Card);
  //   cityInfo.display_name;
  //   cityInfo.lat;
  //   cityInfo.lon;
  // }

  render() {
   
    return(
      <>
      <h1>Explore The City Of Your Next Adventure!</h1>
      <Form controlid= "place_id" onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter your city:</Form.Label>
            <Form.Control type="text" onInput={this.handleCityInput} />
            <Button variant="info" type="submit">EXPLORE!</Button>
        </Form.Group>
      </Form>
      {/* {this.state.handleCityInput} */}

      <Card border="info" style={{ width: '18rem' }} id='Card' onSubmit={this.handleSubmit.cityFind}>
        <Card.Body>
          <Card.Title>{this.state.cityFind.display_name}</Card.Title>
          <Card.Img variant="top" src="https://maps.locationiq.com/v3/staticmap?key=pk.579aac8209bc39c58f89e14dcc5a9a2b}&center=${this.state.city.lat}, ${this.state.city.lon}&zoom=12" />
          <Card.Text>
            {this.state.cityFind.lat}
            {this.state.cityFind.lon}
          </Card.Text>
        </Card.Body>
      </Card>
      </>
    )
  }
};


export default App;
