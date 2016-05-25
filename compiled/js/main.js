'use strict';

function getRequest(searchTerm) {
  var _pageToken = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  // prepare the request
  var params = {
    part: 'snippet',
    key: 'AIzaSyB9evlzwtgDeMvhbSA-zVYUBQf_K1jcWfc',
    q: searchTerm + ' recipe',
    type: 'video',
    maxResults: 3,
    order: 'date',
    regionCode: 'US',
    fields: 'nextPageToken,prevPageToken,' + 'items(id(videoId)),' + 'items(snippet(title,thumbnails(high)))',
    pageToken: _pageToken
  };
  var url = "https://www.googleapis.com/youtube/v3/search";

  // execute the request
  $.get(url, params, function (data) {
    displayMostRecents(data);
  }, 'json');
}

var displayMostRecents = function displayMostRecents(data) {
  $('.recents.videos').html('');

  var index = 1;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      var vidframe = '\n      <a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="_blank">\n        <img src="' + value.snippet.thumbnails.high.url + '" alt="recent video ' + index++ + '">\n      </a>\n    ';
      $('.recents.videos').append(vidframe);
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
};

$(function () {
  getRequest('');
});
//# sourceMappingURL=main.js.map