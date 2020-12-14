import React from 'react';

class App extends React.Component {
  state ={
    searchValue: "",
    moviesToDisplay: []
  };


  searchBoxChanged = (event) => {
    this.setState({searchValue: event.target.value});
  }

  buttonClicked = async (event) => {
    const response = await fetch("http://localhost:3001/movies?search="+encodeURIComponent(this.state.searchValue));
    const movies = await response.json();

    this.setState({moviesToDisplay: movies});
  }

  render(){
    return (
      <div className="App">
        <a id="browse-movies" href="#" >Browse</a>
        <a id="register" href="#">Register</a>
        <input type="text" id="search-box" onChange={this.searchBoxChanged}/>
        <button onClick={this.buttonClicked} type="button" id="search-button">Search</button> 
        {
          this.state.moviesToDisplay.map( movie => <img key={movie.id} src={movie.poster} alt={movie.title}/>)
        }
      </div>
    );
  }
}

export default App;
