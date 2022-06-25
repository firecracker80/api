import React from 'react';

class Movies extends React.Component {


  render() {

    return (
      this.props.cityMovies.map((clip, idx) => {
        <OneMovie
          clip={clip}
          key={idx} />
        })
        
    )      
  }

};




class OneMovie extends React.Component {

  render() {

    return (
      <>
        <ul>
          <li><b>Title:</b> {this.props.clip.title}</li>
          <li><b>Release Date:</b> {this.props.clip.release_date}</li>
          <li><b>Overview:</b> {this.props.clip.overview}</li>
        </ul>

      </>
    )
  }
}

export default Movies;
