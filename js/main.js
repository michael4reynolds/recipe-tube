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

let thumbRecent = function(value, index) {
  return {index: index, thumb: `
          <a href="https://www.youtube.com/watch?v=${value.id.videoId}" target="_blank">
            <img src="${value.snippet.thumbnails.high.url}" alt="recent video ${index++}">
          </a>
        `};
}

let thumbResult = function(value, index) {
  return {index: index, thumb: `
          <a href="https://www.youtube.com/watch?v=${value.id.videoId}" class="recipe-video">
            <img src="${value.snippet.thumbnails.high.url}" alt="recent video ${index++}">
            <p>${value.snippet.title.truncateString(25).toLowerCase()}</p>
          </a>
        `};
}

function displayResults(url, params, el, thumbType) {
  $.get(url, params, function (data) {
    var $element = $(el)
    $element.html('')

    let index = 1
    for (let value of data.items) {
      let __ret = thumbType(value, index);
      index = __ret.index;
      let thumb = __ret.thumb;
      $element.append(thumb)
    }
  }, 'json')
}

$(function () {
  displayResults(...getRequest(''), '.recents.videos', thumbRecent)

  $('[name=submit]').on('click', (e) => {
    e.preventDefault()

    let searchTerm = $('[name=recipe]').val()
    displayResults(...getRequest(searchTerm), '.results.videos', thumbResult)
  })
})


String.prototype.truncateString = function (max, add='...') {
  return (this.length > max ? this.substring(0, max) + add : this)
}
