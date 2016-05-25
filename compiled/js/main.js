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
function displayMostRecent(url, params) {
  $.get(url, params, function (data) {
    var $recents = $('.recents.videos');
    $recents.html('');

    var index = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        var thumb = '\n      <a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="_blank">\n        <img src="' + value.snippet.thumbnails.high.url + '" alt="recent video ' + index++ + '">\n      </a>\n    ';
        $recents.append(thumb);
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

$(function () {
  displayMostRecent.apply(undefined, _toConsumableArray(getRequest('')));
});
//# sourceMappingURL=main.js.map