function getRequest(searchTerm, max = 3, orderby = 'date', _pageToken = '') {
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
    'items(snippet(title,channelTitle,thumbnails(high),publishedAt,description))',
    pageToken: _pageToken
  }
  let url = "https://www.googleapis.com/youtube/v3/search"
  return [url, params]
}

let thumbResult = function (value, index) {
  const yt = 'https://www.youtube.com/'
  const vId = value.id.videoId
  return {
    index: index,
    thumb: `
        <div class="col s12 m6 l4">
          <div class="card">
            <div class="card-image">
              <a href="${yt}watch?v=${vId}" class="recipe-video" 
                  data-video="${yt}embed/${vId}?autoplay=1&controls=0&showinfo=0" 
                  data-author="${value.snippet.channelTitle}"
                  data-published="${value.snippet.publishedAt}"
                  data-description="${value.snippet.description}">
                <img src="${value.snippet.thumbnails.high.url}" alt="recent video ${index++}" class="responsive-img">
                <span class="card-title">${value.snippet.title.toLowerCase()}</span>
              </a>
            </div>
          </div>
        </div>
        `
  }
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
  let vidInfo = {
    author: $(this).attr('data-author'),
    published: $(this).attr('data-published'),
    directions: $(this).attr('data-description'),
  }

  $('.author').html(vidInfo.author)
  $('.published').html(vidInfo.published.split('T')[0])
  $('.directions').html(vidInfo.directions)
  $('.video-wrapper').html(`<iframe src="${embed}" frameborder="0" allowfullscreen></iframe>`)
  $('#player-area').removeClass('hide')
}

let showNextYT = function () {
  displayResults(...getRequest(getSearchTerm(), undefined, undefined,
    $('.btn-more').attr('next')), '.results.videos', thumbResult)
}

$(function () {
  displayResults(...getRequest(''), '.recents.videos', thumbResult)

  $('#recipe-search, #recipe-search-sm').on('submit', (e) => {
    e.preventDefault()
    const searchTerm = getSearchTerm();
    if (searchTerm === null || searchTerm.length < 2) return
    displayResults(...getRequest(searchTerm, 6), '.results.videos', thumbResult)
  })

  $('.recents.videos, .results.videos').on('click', '.recipe-video', popUpYT)

  $('.btn-more').on('click', function () {
    showNextYT()
  })

  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500)
        return false
      }
    }
  })
})
