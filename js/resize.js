'use strict';

(function() {
  var STEP = 25;
  var MAX_PERCENT = 100;

  var imgUpload = document.querySelector('.img-upload');
  var editPhoto = imgUpload.querySelector('.img-upload__overlay');
  var resize = editPhoto.querySelector('.img-upload__resize');
  var uploadPreview = editPhoto.querySelector('.img-upload__preview');


  var resizeMinus = resize.querySelector('.resize__control--minus');
  var resizePlus = resize.querySelector('.resize__control--plus');
  var resizeValue = resize.querySelector('.resize__control--value');
  var changeScale = function(newSize) {
    uploadPreview.style.transform = 'scale(' + newSize / MAX_PERCENT + ')';
    resizeValue.value = newSize + '%';
  };

  resizeMinus.addEventListener('click', function(evt) {
    evt.preventDefault();
    var currentResizeValue = resizeValue.value.slice(0, -1) * 1;
    var newResizeValue = currentResizeValue - STEP;
    if (newResizeValue < STEP) {
      return;
    }
    changeScale(newResizeValue);
  });

  resizePlus.addEventListener('click', function(evt) {
    evt.preventDefault();
    var currentResizeValue = resizeValue.value.slice(0, -1) * 1;
    var newResizeValue = currentResizeValue + STEP;
    if (newResizeValue > MAX_PERCENT) {
      return;
    }
    changeScale(newResizeValue);
  });
})();
