'use strict';

var pictures = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var PHOTOS_NUMBER = 25;

var comments = [
  'Всё отлично',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
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

var randomArrayValue = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var randomValue = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var photosArray = function(number) {
  var arr = [];
  for (var i = 0; i < number; i++) {
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomValue(MIN_LIKES, MAX_LIKES),
      comment: randomArrayValue(comments),
      description: randomArrayValue(descriptions)
    };
  }
  return arr;
};

var renderPicture = function(picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--comments').textContent = '1';
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;

  return pictureElement;
};

var fillBlock = function(arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPicture(arr[i]));
  }
  return fragment;
};

var picturesArray = photosArray(PHOTOS_NUMBER);
pictures.appendChild(fillBlock(picturesArray));



var showBigPicture = function(picture) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.comments-count').textContent = 1;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

};

showBigPicture(picturesArray[0]);



