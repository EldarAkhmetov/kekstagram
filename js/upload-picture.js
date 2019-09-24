'use strict';
var imgUpload = document.querySelector('.img-upload');
var editPhoto = imgUpload.querySelector('.img-upload__overlay');
var imgUploadScale = editPhoto.querySelector('.img-upload__scale');
var imgUploadPreview = editPhoto.querySelector('.img-upload__preview img');

var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
imgUploadCancel.addEventListener('click', function(evt) {
  evt.preventDefault();
  hideEditPhotoPopup();
});

var popupPressEscHandler = function(evt) {
  var blockEscWhenFocus = evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description';
  window.util.isKeydownEsc(evt, hideEditPhotoPopup, blockEscWhenFocus);
};

var showEditPhotoPopup = function() {
  editPhoto.classList.remove('hidden');
  document.addEventListener('keydown', popupPressEscHandler);

  imgUpload.querySelector('.text__hashtags').focus();
  var effects = imgUpload.querySelectorAll('.effects__radio');
  for (var i = 0; i < effects.length; i++) {
    effects[i].addEventListener('change', function(evt) {
      imgUploadPreview.classList = '';
      if (evt.target.value === 'none') {
        imgUploadScale.classList.add('hidden');
      } else {
        imgUploadScale.classList.remove('hidden');

        imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
      }
    });
  }
};

var hideEditPhotoPopup = function() {
  uploadFile.value = '';
  editPhoto.classList.add('hidden');
  document.removeEventListener('keydown', popupPressEscHandler);
};


var uploadFile = document.querySelector('#upload-file');

var changeFileHandler = function() {
  showEditPhotoPopup();
};

uploadFile.addEventListener('change', changeFileHandler);
