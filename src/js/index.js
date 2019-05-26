// jshint esversion: 6

const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []; // Empty array

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

// Filtering down matches based off of user imput

function findMatches(wordsToMatch, cities) {
  return cities.filter(place => {
    // We have to see fi the city or state matches what the user input
    const regex = RegExp(wordsToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}
