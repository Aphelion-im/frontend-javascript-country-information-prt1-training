'use strict';

window.addEventListener('load', () => {
  const countryList = document.querySelector('.country-list');

  async function fetchWorldData() {
    try {
      const results = await axios.get('https://restcountries.com/v3.1/all'); // This version, v3.1, of the API seems stable now
      const countries = results.data;
      countries.sort((a, b) => a.population - b.population); // Keeps the original array intact and sorts data

      createCards(countries);
    } catch (e) {
      console.error(e);
    }
  }

  // Could have done it with innerHTML.
  function createCards(countries) {
    countries.forEach((country) => { // Or with map(). I chose forEach().
      const region = country.region;
      const listItem = document.createElement('li');
      const imageFlag = document.createElement('img');
      const countryName = document.createElement('span');
      const countryNameText = document.createTextNode(country.name.common);
      const countryPopulation = document.createElement('p');
      const countryPopulationText = document.createTextNode(`Has a population of ${country.population} people`);
      imageFlag.setAttribute('class', 'country-flag');
      imageFlag.setAttribute('src', country.flags.svg);
      imageFlag.setAttribute('alt', country.name.common);
      imageFlag.setAttribute('title', country.name.common);
      listItem.appendChild(imageFlag);
      countryName.setAttribute('class', 'country-name');
      listItem.appendChild(countryName);
      countryName.appendChild(countryNameText);
      countryName.style.color = checkRegion(region); // To determine region color. Gets its color value from the checkRegion function
      countryPopulation.setAttribute('class', 'country-population');
      countryPopulation.appendChild(countryPopulationText);
      listItem.appendChild(countryPopulation);
      countryList.appendChild(listItem);
    });
  }

  // Clean and to the point
  function checkRegion(region) {
    switch (region) {
      case 'Africa':
        return 'blue';
      case 'Americas':
        return 'green';
      case 'Asia':
        return 'red';
      case 'Europe':
        return 'yellow';
      case 'Oceania':
        return 'purple';
      default:
        return;
    }
  }

  fetchWorldData();
}); // End load event listener
