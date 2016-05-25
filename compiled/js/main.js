'use strict';

function getRequest(searchTerm) {
  var _pageToken = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  // prepare the request
  var params = {
    part: 'snippet',
    key: 'AIzaSyB9evlzwtgDeMvhbSA-zVYUBQf_K1jcWfc',
    q: searchTerm,
    type: 'video',
    maxResults: 3,
    order: 'date',
    regionCode: 'US',
    videoCategoryId: 26,
    fields: "nextPageToken,items(id(videoId)),items(snippet(title,thumbnails(high)))",
    pageToken: _pageToken
  };
  var url = "https://www.googleapis.com/youtube/v3/search";

  // execute the request
  $.get(url, params, function (data) {
    displayResults(data);
  }, 'json');
}

var displayResults = function displayResults(data) {
  console.log(data.nextPageToken);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      console.log(value.id.videoId);
      console.log(value.snippet.title);
      console.log(value.snippet.thumbnails.high.url);
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
  getRequest('recipe');
});
//# sourceMappingURL=main.js.map