'use strict';

(function() {
  var bigPicture = document.querySelector('.big-picture');

  var hideBigPicturePopup = function() {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', popupPressEscHandler);
  };

  var popupPressEscHandler = function(evt) {
    window.util.isKeydownEsc(evt, hideBigPicturePopup, true);
  };

  var showBigPicture = function(picture) {
    bigPicture.querySelector('.social__comments').innerHTML = '';
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', popupPressEscHandler);
    bigPicture.querySelector('.social__footer-text').value = '';
    bigPicture.querySelector('.social__footer-text').focus();
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
    bigPicture.querySelector('.comments-count').textContent = picture.comment.length;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comments').appendChild(fillBlock(picture.comment, window.render.comment));
    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function(evt) {
      evt.preventDefault();
      hideBigPicturePopup();
    });
  };

  var fillBlock = function(arr, renderer, handler) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      if (handler) {
        fragment.appendChild(renderer(arr[i], handler));
      } else {
        fragment.appendChild(renderer(arr[i]));
      }
    }
    return fragment;
  };

  window.fillBlock = fillBlock;
  window.showBigPicture = showBigPicture;

})();
