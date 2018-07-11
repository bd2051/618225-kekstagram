'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var socialLoadMore = bigPicture.querySelector('.social__loadmore');

  var drawBigPhoto = function (photo, commentCount) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    var BEGIN_COUNT = 0;
    drawComment(photo.comments, BEGIN_COUNT, commentCount);
    bigPicture.querySelector('.social__caption').textContent = photo.description;
  };

  var drawComment = function (comments, countBegin, countEnd) {
    var count = fillCommentList(comments, countBegin, countEnd);
    bigPicture.querySelector('.visible-comments').textContent = count;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    if (count === comments.length) {
      socialLoadMore.classList.add('visually-hidden');
    } else {
      socialLoadMore.classList.remove('visually-hidden');
    }
  };

  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');

  var printComment = function (comment) {
    var MAX_AVATAR_NUMBER = 6;
    var MIN_AVATAR_NUMBER = 1;
    var commentElement = commentTemplate.cloneNode(true);

    var avatarSource = 'img/avatar-' + window.util.generateNaturalNumber(MAX_AVATAR_NUMBER, MIN_AVATAR_NUMBER) + '.svg';
    commentElement.querySelector('.social__picture').src = avatarSource;
    commentElement.querySelector('.social__text').textContent = comment;

    return commentElement;
  };

  var commentList = document.querySelector('.social__comments');

  var fillCommentList = function (comments, countBegin, countEnd) {
    var fragment = document.createDocumentFragment();
    if (countEnd > comments.length) {
      countEnd = comments.length;
    }
    for (var i = countBegin; i < countEnd; i++) {
      fragment.appendChild(printComment(comments[i]));
    }
    commentList.appendChild(fragment);
    return countEnd;
  };

  var deleteComment = function () {
    var comment = commentList.querySelectorAll('.social__comment');
    for (var i = 0; i < comment.length; i++) {
      commentList.removeChild(comment[i]);
    }
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
    var commentCount = 5;
    drawBigPhoto(photo, commentCount);
    bigPictureClose.addEventListener('click', onBigPictureCloseClick);
    document.addEventListener('keydown', onBigPictureEscPress);
    document.body.classList.add('modal-open');
    socialLoadMore.addEventListener('click', function () {
      drawComment(photo.comments, commentCount, commentCount += 5);
    });
  };

  var closeBigPhoto = function () {
    bigPicture.classList.add('hidden');
    deleteComment();
    bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
    document.removeEventListener('keydown', onBigPictureEscPress);
    document.body.classList.remove('modal-open');
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
