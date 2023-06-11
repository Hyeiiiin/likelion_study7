import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

//import PropTypes from "prop-types";
/*
// food webpage

const foodIlike = [
  {
    id:1,
    name: "Kimchi",
    image:
      "https://cdn.pixabay.com/photo/2022/06/13/05/14/kimchi-7259268_1280.jpg",
    rating: 5
  },
  {
    id:2,
    name: "Samgyeopsal",
    image:
      "https://cdn.pixabay.com/photo/2020/11/11/03/26/pork-belly-5731404_1280.jpg",
    rating: 4.9
  },
  {
    id:3,
    name: "Bibimbap",
    image:
    "https://cdn.pixabay.com/photo/2017/08/08/09/44/food-photography-2610863_1280.jpg",
    rating: 5.5
  },
  {
    id:4,
    name: "Doncasu",
    image:
    "https://cdn.pixabay.com/photo/2016/09/23/23/23/restaurant-1690696_1280.jpg",
    rating: 5.4
  },
  {
    id:5,
    name: "Kimbap",
    image:
    "https://cdn.pixabay.com/photo/2020/02/08/00/50/kimbap-4828808_1280.jpg",
    rating: 4.7
  }
];

function Food({ name, picture, rating }) {
  return (
  <div>
    <h2>I like {name}</h2>
    <h4>{rating}/5.0</h4>
    <img src={picture} alt={name} />
  </div>
  );
}

Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

function App() {
  return ( 
  <div>
    {foodIlike.map(dish => (
      <Food 
        key={dish.id} 
        name={dish.name} 
        picture={dish.image} 
        rating={dish.rating} 
      />
    ))}
  </div>
  );
}
*/

/* plus & minus page

class App extends React.Component{
  state = {
    count: 0
  };
  add = () => {
    this.setState(current => ({ count: current.count + 1 }));
  };
  minus = () => {
    this.setState(current => ({ count: current.count - 1 }));
  };
  render(){
    return (
    <div>
      <h1>The number is {this.state.count}</h1>
      <button onClick={this.add}>Add</button>
      <button onClick={this.minus}>Minus</button>
    </div>
    );
  }
}
*/

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async() => {
    const {
      data: { 
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating"
      );
    this.setState({ movies, isLoading: false });
  };
  componentDidMount(){
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
    <section className="container">
      {isLoading ? ( 
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
       ) : (
        <div className="movies">
          {movies.map(movie => (
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
    </section>
    );
  }
}

export default App;
