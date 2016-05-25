function getRequest(searchTerm, _pageToken = '') {
  // prepare the request
  let params = {
    part: 'snippet',
    key: 'AIzaSyB9evlzwtgDeMvhbSA-zVYUBQf_K1jcWfc',
    q: searchTerm + ' recipe',
    type: 'video',
    maxResults: 3,
    order: 'date',
    regionCode: 'US',
    fields: 'nextPageToken,prevPageToken,' +
    'items(id(videoId)),' +
    'items(snippet(title,thumbnails(high)))',
    pageToken: _pageToken
  }
  let url = "https://www.googleapis.com/youtube/v3/search"

  // execute the request
  $.get(url, params, function (data) {
    displayResults(data)
  }, 'json')
}

let displayResults = function (data) {
  console.log(data.nextPageToken)
  for (let value of data.items) {
    console.log(value.id.videoId)
    console.log(value.snippet.title)
    console.log(value.snippet.thumbnails.high.url)
  }
}

$(function () {
  getRequest('recipe')
})

