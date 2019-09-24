'use strict';

(function() {


  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');

  var commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');

  var renderPicture = function(picture, handler) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comment.length;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.addEventListener('click', function(evt) {
      evt.preventDefault();
      handler(picture);
    });
    return pictureElement;
  };


  var renderComment = function(comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.text;
    return commentElement;
  };

  window.render = {
    picture: renderPicture,
    comment: renderComment
  };

})();
