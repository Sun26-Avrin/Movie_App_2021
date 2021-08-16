import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Movie from "./Movie"
import "./App.css";

class App extends React.Component{
  state ={
    isLoading : true,
    movies : [],

  } // 미래에 쓸변수를 미리 선언하는 공간이아님.

  getMoives = async() =>{
    // const moives = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
    // console.log(moives.data.data.movies);
    const {
      data : {
        data: {movies}
      }
    } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating");
    console.log(movies);
    this.setState({movies , isLoading:false});
  };

  componentDidMount(){ // fetch data from API
    this.getMoives();
  }



  render(){
    const {isLoading, movies} = this.state;

    return  (
    <section className ="container">
      {isLoading 
        ? (<div className="loader">
            <span className="loader__text">Loading...</span>
          </div> 
        ) : (
          <div className="movies">
            {movies.map(movie =>(
                <Movie 
                key={movie.id}
                id={movie.id} 
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary} 
                poster={movie.medium_cover_image} 
                genres={movie.genres}
                />
            ))}
          </div>
        
        
        
        )}

    </section>);
  }
}

export default App;

