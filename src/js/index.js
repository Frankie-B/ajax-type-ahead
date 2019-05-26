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
    const regex = new RegExp(wordsToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

// Will add commas to population numbers
function numbersWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Will display suggestions matching the users input
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  // The code below hooks our data to the html document
  const html = matchArray
    .map(place => {
      // To highlight the matched  search terms
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
    <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numbersWithCommas(place.population)}</span>
    </li>
    `;
    })
    .join(''); // Will return our array item as a string
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
