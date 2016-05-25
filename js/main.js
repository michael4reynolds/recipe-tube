function getRequest(searchTerm, max=3, orderby='date', _pageToken='') {
  let params = {
    part: 'snippet',
    key: 'AIzaSyB9evlzwtgDeMvhbSA-zVYUBQf_K1jcWfc',
    q: searchTerm + ' recipe',
    type: 'video',
    maxResults: max,
    order: orderby,
    regionCode: 'US',
    fields: 'nextPageToken,prevPageToken,' +
            'items(id(videoId)),' +
            'items(snippet(title,thumbnails(high)))',
    pageToken: _pageToken
  }
  let url = "https://www.googleapis.com/youtube/v3/search"
  return [url, params]
}
function displayMostRecent(url, params) {
  $.get(url, params, function (data) {
    var $recents = $('.recents.videos')
    $recents.html('')

    let index = 1
    for (let value of data.items) {
      let thumb = `
      <a href="https://www.youtube.com/watch?v=${value.id.videoId}" target="_blank">
        <img src="${value.snippet.thumbnails.high.url}" alt="recent video ${index++}">
      </a>
    `
      $recents.append(thumb)
    }
  }, 'json')
}

$(function () {
  displayMostRecent(...getRequest(''))
})

