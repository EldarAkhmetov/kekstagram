'use strict';

(function() {
  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function(evt) {
    window.backend.saveHandler(new FormData(form), function() {
      window.hideEditPhotoPopup();
    }, window.backend.errorHandler);
    evt.preventDefault();
  });
})();
