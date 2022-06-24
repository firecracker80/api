import React from 'react';

class Movies extends React.Component {
 

  render() {
    return(
      this.props.cityMovies.map((clip, idx) => (
        <ul key={idx}><li><b>Title:</b> {clip.title}</li><li><b>Release Date:</b> {clip.release_date}</li></ul>
      ))
    ) 

  };
    
  
}

export default Movies;
