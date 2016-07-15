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
        `}
}

let thumbResult = function(value, index) {
  const yt = 'https://www.youtube.com/'
  const vId = value.id.videoId
  return {index: index, thumb: `
          <a href="${yt}watch?v=${vId}" class="recipe-video" data-video="${yt}embed/${vId}?autoplay=1">
            <img src="${value.snippet.thumbnails.high.url}" alt="recent video ${index++}">
            <p>${value.snippet.title.truncateString(25).toLowerCase()}</p>
          </a>
        `}
}

function displayResults(url, params, el, thumbType) {
  $.get(url, params, function (data) {
    var $element = $(el)
    $element.html('')
    $('.btn-more').attr('next', data.nextPageToken)

    let index = 1
    for (let value of data.items) {
      let __ret = thumbType(value, index)
      index = __ret.index
      let thumb = __ret.thumb
      $element.append(thumb)
    }
  }, 'json')
}

let getSearchTerm = () => {
  return $('[name=recipe]').val()
}

let popUpYT = function (e) {
  e.preventDefault()
  let embed = $(this).attr('data-video')
  window.open(embed, '_blank', 'height=400,width=600,top=300,left=300')
}

let showNextYT = function () {
  displayResults(...getRequest(getSearchTerm(), undefined, undefined,
    $('.btn-more').attr('next')), '.results.videos', thumbResult)
}

$(function () {
  displayResults(...getRequest(''), '.recents.videos', thumbRecent)

  $('#recipe-search').on('submit', (e) => {
    e.preventDefault()
    displayResults(...getRequest(getSearchTerm()), '.results.videos', thumbResult)
  })

  $('.results.videos').on('click', '.recipe-video', popUpYT)

  $('.btn-more').on('click', function() {
    showNextYT()
  })
})

String.prototype.truncateString = function (max, add='...') {
  return (this.length > max ? this.substring(0, max) + add : this)
}
