'use strict';

(function() {
  var imgUpload = document.querySelector('.img-upload');
  var editPhoto = imgUpload.querySelector('.img-upload__overlay');


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
    window.addEffects(imgUpload);
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

})();
