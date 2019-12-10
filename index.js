'use strict';

const apiKey = "y4aw0a2dOHEjXVFj9abYIQd3p0Cu8GSxQhtgdakZ"

const searchURL = "https://developer.nps.gov/api/v1/parks";


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length & i<maxResults ; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href="${responseJson.data[i].url}">"${responseJson.data[i].url}"</a></p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getResults(states, maxResults) {
  const params = {
    stateCode: states,
    limit: maxResults,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const input = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getResults(input, maxResults);
  });
}

$(watchForm);