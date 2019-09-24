'use strict';

(function() {
  var PHOTOS_NUMBER = 25;

  var picturesArray = window.getPhotosArray(PHOTOS_NUMBER);

  var pictures = document.querySelector('.pictures');

  pictures.appendChild(window.fillBlock(picturesArray, window.render.picture, window.showBigPicture));

})();
