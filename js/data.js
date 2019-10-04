'use strict';

(function() {
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

  var avatar = {
    MIN: 1,
    MAX: 6
  };

  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  var MAX_COMMENTS_NUMBER = 4;

  var getRandomAvatar = function() {
    return 'img/avatar-' + window.util.getRandomValue(avatar.MIN, avatar.MAX) + '.svg';
  };

  var getCommentsArray = function(items) {
    var arr = [];
    var commentsNumber = window.util.getRandomValue(0, (MAX_COMMENTS_NUMBER + 1));
    if (commentsNumber === 0) {
      return arr;
    }
    var getArrayElement = function() {
      var firstString = window.util.getRandomArrayValue(items);
      var secondString = window.util.getRandomArrayValue(items);
      return {
        text: firstString === secondString ? firstString : firstString + ' ' + secondString,
        avatar: getRandomAvatar()
      };
    };
    for (var i = 0; i < commentsNumber; i++) {
      arr[i] = getArrayElement();
    }
    return arr;
  };

  var getPhotosArray = function(number) {
    var arr = [];
    for (var i = 0; i < number; i++) {
      arr[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.util.getRandomValue(MIN_LIKES, MAX_LIKES),
        comment: getCommentsArray(comments),
        description: window.util.getRandomArrayValue(descriptions),
        avatar: getRandomAvatar()
      };
    }
    return arr;
  };


  window.getPhotosArray = getPhotosArray;

})();
