'use strict';

(function() {
  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
  var form = imgFilters.querySelector('.img-filters__form');
  var NEW_FILTER_LENGTH = 10;
  var FILTER_INDEX = 1;

  var getFilterPopular = function(pictures) {
    return pictures.slice();
  };

  var getFilterNew = function(pictures) {
    var findNewArray = window.util.getNonRepeatNumbers(pictures.length, NEW_FILTER_LENGTH);
    var newPicturesArray = [];
    for (var i = 0; i < NEW_FILTER_LENGTH; i++) {
      newPicturesArray[i] = pictures[findNewArray[i]];
    }
    return newPicturesArray;
  };

  var getFilterDiscussed = function(pictures) {
    return pictures.slice().sort(function(left, right) {
      var commentDiff = right.comments.length - left.comments.length;
      if (commentDiff === 0) {
        commentDiff = pictures.indexOf(left) - pictures.indexOf(right);
      }
      return commentDiff;
    });
  };

  var Filters = {
    popular: getFilterPopular,
    new: getFilterNew,
    discussed: getFilterDiscussed

  };

  var buttons = form.querySelectorAll('.img-filters__button');

  var pictures = document.querySelector('.pictures');

  var filterChangeHandler = function(button) {
    button.addEventListener('click', function(evt) {
      if (button.classList.contains('img-filters__button--active')) {
        return;
      }
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('img-filters__button--active');
      }
      button.classList.add('img-filters__button--active');
      window.debounce(newFilter)(evt.target.id.split('-')[FILTER_INDEX]);
    });
  };

  var newFilter = function(filter) {
    window.backend.loadHandler(function(picturesArray) {
      var newPicturesArray = Filters[filter](picturesArray);
      var oldPictures = pictures.querySelectorAll('.picture__link');

      for (var j = 0; j < oldPictures.length; j++) {
        pictures.removeChild(oldPictures[j]);
      }

      pictures.appendChild(window.fillBlock(newPicturesArray, window.render.picture, window.showBigPicture));
    }, window.backend.errorHandler);
  };

  newFilter('popular');

  for (var i = 0; i < buttons.length; i++) {
    filterChangeHandler(buttons[i]);
  }
})();
