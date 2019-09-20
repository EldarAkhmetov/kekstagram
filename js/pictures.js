'use strict';
var ESC_KEYCODE = 27;

var pictures = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');

var commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var PHOTOS_NUMBER = 25;
var MAX_COMMENTS_NUMBER = 4;

var comments = [
  'Всё отлично.',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];

var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomArrayValue = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomValue = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getCommentsArray = function(array) {
  var arr = [];
  var commentsNumber = getRandomValue(0, (MAX_COMMENTS_NUMBER + 1));
  if (commentsNumber === 0) {
    return arr;
  }
  var getArrayElement = function() {
    var firstString = getRandomArrayValue(array);
    var secondString = getRandomArrayValue(array);
    return firstString === secondString ? firstString : firstString + ' ' + secondString;
  };
  for (var i = 0; i < commentsNumber; i++) {
    arr[i] = getArrayElement();
  }
  return arr;
};

var photosArray = function(number) {
  var arr = [];
  for (var i = 0; i < number; i++) {
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomValue(MIN_LIKES, MAX_LIKES),
      comment: getCommentsArray(comments),
      description: getRandomArrayValue(descriptions)
    };
  }
  return arr;
};

var renderPicture = function(picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comment.length;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.addEventListener('click', function(evt) {
    evt.preventDefault();
    showBigPicture(picture);
  });
  return pictureElement;
};

var renderComment = function(comment) {
  var commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomValue(1, 6) + '.svg';
  commentElement.querySelector('.social__text').textContent = comment;
  return commentElement;
};

var fillBlock = function(arr, renderer) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderer(arr[i]));
  }
  return fragment;
};

var bigPicture = document.querySelector('.big-picture');

var showBigPicture = function(picture) {

  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', bigPicturePopupPressEscHandler);
  bigPicture.querySelector('.social__footer-text').value = '';
  bigPicture.querySelector('.social__footer-text').focus();
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.comments-count').textContent = picture.comment.length;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
  bigPicture.querySelector('.social__comments').appendChild(fillBlock(picture.comment, renderComment));
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function(evt) {
    evt.preventDefault();
    hideBigPicturePopup();
  });
};

var picturesArray = photosArray(PHOTOS_NUMBER);
pictures.appendChild(fillBlock(picturesArray, renderPicture));

var imgUpload = document.querySelector('.img-upload');
var editPhoto = imgUpload.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
imgUploadCancel.addEventListener('click', function(evt) {
  evt.preventDefault();
  hideEditPhotoPopup();
});

var editPhotoPopupPressEscHandler = function(evt) {
  evt.preventDefault();
  if (evt.keyCode === ESC_KEYCODE) {
    hideEditPhotoPopup();
  }
};

var bigPicturePopupPressEscHandler = function(evt) {
  evt.preventDefault();
  if (evt.keyCode === ESC_KEYCODE) {
    hideBigPicturePopup();
  }
};

var showEditPhotoPopup = function() {
  editPhoto.classList.remove('hidden');
  document.addEventListener('keydown', editPhotoPopupPressEscHandler);
  imgUpload.querySelector('.text__hashtags').focus();
  var effects = imgUpload.querySelectorAll('.effects__radio');
  for (var i = 0; i < effects.length; i++) {
    console.log(effects[i]);
  }
};

var hideEditPhotoPopup = function() {
  uploadFile.value = '';
  editPhoto.classList.add('hidden');
  document.removeEventListener('keydown', editPhotoPopupPressEscHandler);
};

var hideBigPicturePopup = function() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', bigPicturePopupPressEscHandler);
};



var uploadFile = document.querySelector('#upload-file');

var changeFileHandler = function() {
  showEditPhotoPopup();
};

uploadFile.addEventListener('change', changeFileHandler);