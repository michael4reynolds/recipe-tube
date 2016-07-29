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
              <a href="#player-area" class="recipe-video modal-trigger" 
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

function displayResults(url, params, el, thumbType, query = false) {
  $.get(url, params, function (data) {
    var $element = $(el)
    $element.html('')

    let index = 1
    for (let value of data.items) {
      let __ret = thumbType(value, index)
      index = __ret.index
      let thumb = __ret.thumb
      $element.append(thumb)
    }

    const $btn = $('.btn-more');
    $btn.attr('next', data.nextPageToken)
    if (query && data.items.length >= 6) {
      $btn.removeClass('hide')
    }
  }, 'json')
}

let getSearchTerm = () => {
  let $searchTerm = $('[name=recipe]').is(':visible') ? $('[name=recipe]') : $('[name=recipe-sm]')
  return $searchTerm.val()
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
  $('#player-area').openModal({
    dismissible: true,
    opacity: .5,
    complete: function () {
      $('.video-wrapper').html('')
    }
  })
}

let showNextYT = function () {
  displayResults(...getRequest(getSearchTerm(), 6, undefined,
    $('.btn-more').attr('next')), '.results.videos', thumbResult)
}

$(function () {
  displayResults(...getRequest(''), '.recents.videos', thumbResult)

  $('form').on('submit', (e) => {
    e.preventDefault()
    const searchTerm = getSearchTerm();
    if (searchTerm === null || searchTerm.length < 2) return
    displayResults(...getRequest(searchTerm, 6), '.results.videos', thumbResult, true)
    $('html, body').animate({
      scrollTop: $('#results-header').offset().top
    }, 500)
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
