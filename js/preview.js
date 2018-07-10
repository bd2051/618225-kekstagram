'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var drawBigPhoto = function (photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    var socialComment = bigPicture.querySelectorAll('.social__comment');
    var MAX_AVATAR_NUMBER = 6;
    var MIN_AVATAR_NUMBER = 1;
    for (var i = 0; i < socialComment.length; i++) {
      if (photo.comments[i]) {
        var avatarSource = 'img/avatar-' + window.util.generateNaturalNumber(MAX_AVATAR_NUMBER, MIN_AVATAR_NUMBER) + '.svg';
        socialComment[i].querySelector('.social__picture').src = avatarSource;
        socialComment[i].querySelector('.social__text').textContent = photo.comments[i];
      } else {
        socialComment[i].classList.add('visually-hidden');
      }
    }
    bigPicture.querySelector('.social__caption').textContent = photo.description;
  };

  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  var onBigPictureCloseClick = function () {
    closeBigPhoto();
  };

  var onBigPictureEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPhoto);
  };

  var openBigPhoto = function (photo) {
    bigPicture.classList.remove('hidden');
    drawBigPhoto(photo);
    window.util.hideBlock(bigPicture, '.social__comment-count');
    window.util.hideBlock(bigPicture, '.social__loadmore');
    bigPictureClose.addEventListener('click', onBigPictureCloseClick);
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPhoto = function () {
    bigPicture.classList.add('hidden');
    bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var addOpeningBigPhoto = function (element, index, photos) {
    element[index].addEventListener('click', function () {
      openBigPhoto(photos[index]);
    });
  };

  window.preview = {
    onSuccessFill: function (picturesElement, photosElement) {
      for (var i = 0; i < picturesElement.length; i++) {
        addOpeningBigPhoto(picturesElement, i, photosElement);
      }
    }
  };
})();
