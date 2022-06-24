import React from 'react';

class Movies extends React.Component {


  render() {
    return (

      this.props.cityMovies.map((clip, idx) => (
        <>
          <div key={clip.poster_path}>
            {/* <article>
              <img src={clip.src} alt={clip.title}/>
            </article> */}
            <ul>
              <li><b>Title:</b> {clip.title}</li>
              <li><b>Release Date:</b> {clip.release_date}</li>
              <li><b>Overview:</b> {clip.overview}</li></ul>
          </div>
        </>

      ))
    )

  };


}

export default Movies;
