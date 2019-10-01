'use strict';

(function() {
  var STEP = 25;
  var MAX_PERCENT = 100;
  var FIRST_ELEMENT = 0;
  var LAST_ELEMENT = -1;

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

  var onChangeScale = function(action) {
    var value = +resizeValue.value.slice(FIRST_ELEMENT, LAST_ELEMENT);
    if (action === 'reduce' && value > STEP ) {
      value -= STEP;
    }

    if (action === 'increase' && value < MAX_PERCENT ) {
      value += STEP;
    }
    changeScale(value);
  };

  resizeMinus.addEventListener('click', function(evt) {
    evt.preventDefault();
    onChangeScale('reduce');
  });

  resizePlus.addEventListener('click', function(evt) {
    evt.preventDefault();
    onChangeScale('increase');
  });
})();
