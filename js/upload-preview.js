'use strict';
(function() {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imgUpload = document.querySelector('.img-upload');
  var fileChooser = imgUpload.querySelector('.img-upload__input');
  var preview = imgUpload.querySelector('.img-upload__preview img');
  var smallPreviews = imgUpload.querySelectorAll('.effects__preview');

  fileChooser.addEventListener('change', function() {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function(it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function() {
        preview.src = reader.result;
        for (var i = 0; i < smallPreviews.length; i++) {
          smallPreviews[i].style.backgroundImage = 'url(' + reader.result + ')';
        }
      });

      reader.readAsDataURL(file);
    }
  });
})();
