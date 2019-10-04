'use strict';

(function() {
  var form = document.querySelector('.img-upload__form');
  var upload = document.querySelector('.img-upload');
  form.addEventListener('submit', function(evt) {
    window.backend.saveHandler(new FormData(form), function(status) {
      upload.classList.add('hidden');
      console.log(status);
    }, window.backend.errorHandler);
    evt.preventDefault();
  });
})();
