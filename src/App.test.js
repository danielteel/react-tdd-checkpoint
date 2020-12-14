import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

const testMovieResults=[
  {"movieId":2,
  "metascore":"90",
  "boxOffice":"N/A",
  "website":"http://www.starwars.com/episode-iv/",
  "imdbRating":"8.6",
  "imdbVotes":"1,104,701",
  "runtime":"121 min",
  "language":"English",
  "rated":"PG",
  "production":"20th Century Fox",
  "released":"21 Sep 2004",
  "imdbid":"tt0076759",
  "plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
  "director":"George Lucas",
  "title":"Star Wars: Episode IV - A New Hope",
  "actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
  "response":"True",
  "type":"movie",
  "awards":"Won 6 Oscars. Another 50 wins & 28 nominations.",
  "dvd":"25 May 1977",
  "year":"1977",
  "poster":"https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  "country":"USA",
  "genre":"Action, Adventure, Fantasy, Sci-Fi",
  "writer":"George Lucas"}];

beforeAll(() => {
  global.fetch = jest.fn(); // mocking `fetch()` API
});

test('if search box exists',()=>{
	const wrapper = shallow(<App />);

  expect(wrapper.find('#search-box')).toHaveLength(1);
});

test('if search button exists',()=>{
	const wrapper = shallow(<App />);

  expect(wrapper.find('#search-button')).toHaveLength(1);
});

test('if browse movies link exists',()=>{
	const wrapper = shallow(<App />);

  expect(wrapper.find('#browse-movies')).toHaveLength(1);
});

test('if register link exists',()=>{
	const wrapper = shallow(<App />);

  expect(wrapper.find('#register')).toHaveLength(1);

}); 


//When text is changed in the search box, state is updated to reflect
test('when text is typed into search box, update state to reflect',  ()=>{
  //Setup
  const wrapper=shallow(<App/>);
  const searchBox = wrapper.find('#search-box');

  //Excercise
  searchBox.props().onChange( {target: { name: 'search-box', value: "Jimmy James" }} );
  //Assert
  expect(wrapper.state().searchValue).toEqual("Jimmy James");

  //Exercise
  searchBox.props().onChange( {target: { name: 'search-box', value: "Micheal Jan Vincent 13" }} );
  //Assert
  expect(wrapper.state().searchValue).toEqual("Micheal Jan Vincent 13");
});

//When user clicks on search button, fetch is called
test('when search button is clicked call fetch', () => {
  //Setup
  const wrapper=shallow(<App/>);
  const searchButton = wrapper.find('#search-button');
  const searchBox = wrapper.find('#search-box');

  //Exercise
  searchBox.props().onChange( {target: {name: 'search-box', value: "The Sandlot"} } )
  searchButton.props().onClick()

  //Assert
  expect(fetch).toHaveBeenCalledWith("http://localhost:3001/movies?search="+encodeURIComponent("The Sandlot"));
})


//Displays a movie after server returns search results
test('displays movie search results', async (done)=>{
  //Setup
  const wrapper=shallow(<App/>);
  const searchButton = wrapper.find('#search-button');
  const searchBox = wrapper.find('#search-box');

  //Exercise
  fetch.mockImplementation( (url)=>{
    return Promise.resolve( {
                              json: () =>  {
                                              return Promise.resolve(testMovieResults);
                                            }
                            })
  })

  searchBox.props().onChange( {target: {name: 'search-box', value: "Star Wars"} } );
  searchButton.props().onClick();
  wrapper.update();
  
  //Assert
  const movie = wrapper.find("img[alt='Star Wars: Episode IV - A New Hope']");

  expect(movie).toHaveLength(1);
});