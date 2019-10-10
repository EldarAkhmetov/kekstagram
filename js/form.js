'use strict';

(function() {
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var form = document.querySelector('.img-upload__form');
  var inputHashtag = form.querySelector('.text__hashtags');
  var submitButton = form.querySelector('.img-upload__submit');

  var isHashtagValid = function(hashtag) {
    if (hashtag.length === 0) {
      return true;
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      inputHashtag.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      return false;
    } else if (hashtag[0] !== '#') {
      inputHashtag.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      return false;
    } else if (hashtag[0] === '#' && hashtag.length === 1) {
      inputHashtag.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      return false;
    } else if (hashtag[0] !== '#') {
      inputHashtag.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      return false;
    } else if (hashtag.indexOf('#', 1) > 0) {
      inputHashtag.setCustomValidity('хэш-теги разделяются пробелами');
      return false;
    }
    return true;
  };

  var submitFormHandler = function(evt) {
    var hashtags = inputHashtag.value.toLowerCase().split(' ');

    if (hashtags.length > MAX_HASHTAGS) {
      inputHashtag.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      evt.preventDefault();
      return;
    }

    for (var i = 0; i < hashtags.length; i++) {
      var validHashtag = isHashtagValid(hashtags[i]);
      if (!validHashtag) {
        break;
      }

      if (hashtags.indexOf(hashtags[i], i + 1) > 0) {
        inputHashtag.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      }

    }

    if (inputHashtag.validationMessage !== '') {
      evt.preventDefault();
      inputHashtag.reportValidity();
    }

  };

  var clearCustomValidity = function() {
    inputHashtag.setCustomValidity('');
  };

  submitButton.addEventListener('click', submitFormHandler);
  inputHashtag.addEventListener('input', clearCustomValidity);
})();
