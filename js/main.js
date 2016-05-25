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
    displayMostRecents(data)
  }, 'json')
}

let displayMostRecents = function (data) {
  $('.recents.videos').html('')

  let index = 1
  for (let value of data.items) {
    let vidframe = `
      <a href="https://www.youtube.com/watch?v=${value.id.videoId}" target="_blank">
        <img src="${value.snippet.thumbnails.high.url}" alt="recent video ${index++}">
      </a>
    `
    $('.recents.videos').append(vidframe)
  }
}

$(function () {
  getRequest('')
})

