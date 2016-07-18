'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getRequest(searchTerm) {
  var max = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];
  var orderby = arguments.length <= 2 || arguments[2] === undefined ? 'date' : arguments[2];

  var _pageToken = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

  var params = {
    part: 'snippet',
    key: 'AIzaSyB9evlzwtgDeMvhbSA-zVYUBQf_K1jcWfc',
    q: searchTerm + ' recipe',
    type: 'video',
    maxResults: max,
    order: orderby,
    regionCode: 'US',
    fields: 'nextPageToken,prevPageToken,' + 'items(id(videoId)),' + 'items(snippet(title,thumbnails(high)))',
    pageToken: _pageToken
  };
  var url = "https://www.googleapis.com/youtube/v3/search";
  return [url, params];
}

var thumbRecent = function thumbRecent(value, index) {
  return {
    index: index, thumb: '\n          <div class="col s12 m6 l4">\n            <div class="card">\n              <div class="card-image">\n                <a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="_blank">\n                  <img src="' + value.snippet.thumbnails.high.url + '" alt="recent video ' + index++ + '" class="responsive-img">\n                  <span class="card-title">' + value.snippet.title.toLowerCase() + '</span>\n                </a>\n              </div>\n            </div>\n          </div>\n        '
  };
};

var thumbResult = function thumbResult(value, index) {
  var yt = 'https://www.youtube.com/';
  var vId = value.id.videoId;
  return {
    index: index, thumb: '\n        <div class="col s12 m6 l4">\n          <div class="card">\n            <div class="card-image">\n              <a href="' + yt + 'watch?v=' + vId + '" class="recipe-video" data-video="' + yt + 'embed/' + vId + '?autoplay=1">\n                <img src="' + value.snippet.thumbnails.high.url + '" alt="recent video ' + index++ + '" class="responsive-img">\n                <span class="card-title">' + value.snippet.title.toLowerCase() + '</span>\n              </a>\n            </div>\n          </div>\n        </div>\n        '
  };
};

function displayResults(url, params, el, thumbType) {
  $.get(url, params, function (data) {
    var $element = $(el);
    $element.html('');
    $('.btn-more').attr('next', data.nextPageToken);

    var index = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        var __ret = thumbType(value, index);
        index = __ret.index;
        var thumb = __ret.thumb;
        $element.append(thumb);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }, 'json');
}

var getSearchTerm = function getSearchTerm() {
  return $('[name=recipe]').val();
};

var popUpYT = function popUpYT(e) {
  e.preventDefault();
  var embed = $(this).attr('data-video');
  window.open(embed, '_blank', 'height=400,width=600,top=300,left=300');
};

var showNextYT = function showNextYT() {
  displayResults.apply(undefined, _toConsumableArray(getRequest(getSearchTerm(), undefined, undefined, $('.btn-more').attr('next'))).concat(['.results.videos', thumbResult]));
};

$(function () {
  displayResults.apply(undefined, _toConsumableArray(getRequest('')).concat(['.recents.videos', thumbRecent]));

  $('#recipe-search, #recipe-search-sm').on('submit', function (e) {
    e.preventDefault();
    var searchTerm = getSearchTerm();
    if (searchTerm === null || searchTerm.length < 2) return;
    displayResults.apply(undefined, _toConsumableArray(getRequest(searchTerm, 6)).concat(['.results.videos', thumbResult]));
  });

  $('.results.videos').on('click', '.recipe-video', popUpYT);

  $('.btn-more').on('click', function () {
    showNextYT();
  });

  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});
//# sourceMappingURL=main.js.map