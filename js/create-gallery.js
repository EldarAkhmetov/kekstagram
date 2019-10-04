'use strict';

(function() {
  var pictures = document.querySelector('.pictures');

  window.backend.loadHandler(function(picturesArray) {
    pictures.appendChild(window.fillBlock(picturesArray, window.render.picture, window.showBigPicture));
  }, window.backend.errorHandler);


})();
