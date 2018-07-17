'use strict';

(function () {
  var MAX_AVATAR_NUMBER = 6;
  var MIN_AVATAR_NUMBER = 1;
  var BEGIN_COUNT = 0;
  var bigPicture = document.querySelector('.big-picture');
  var socialLoadMore = bigPicture.querySelector('.social__loadmore');

  var drawBigPhoto = function (photo, commentCount) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    drawComment(photo.comments, BEGIN_COUNT, commentCount);
    bigPicture.querySelector('.social__caption').textContent = photo.description;
  };

  var drawComment = function (comments, countBegin, countEnd) {
    var count = fillCommentList(comments, countBegin, countEnd);
    var text = bigPicture.querySelector('.social__comment-count').innerHTML;
    bigPicture.querySelector('.social__comment-count').innerHTML = text.replace(/\d+/, count);
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    if (count === comments.length) {
      socialLoadMore.classList.add('visually-hidden');
    } else {
      socialLoadMore.classList.remove('visually-hidden');
    }
  };

  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');

  var printComment = function (comment) {
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

  var commentCount;
  var comments;
  var onSocialLoadMoreClick = function () {
    drawComment(comments, commentCount, commentCount += 5);
  };

  var openBigPhoto = function (photo) {
    bigPicture.classList.remove('hidden');
    commentCount = 5;
    drawBigPhoto(photo, commentCount);
    document.body.classList.add('modal-open');
    bigPictureClose.addEventListener('click', onBigPictureCloseClick);
    document.addEventListener('keydown', onBigPictureEscPress);
    comments = photo.comments;
    socialLoadMore.addEventListener('click', onSocialLoadMoreClick);
  };

  var closeBigPhoto = function () {
    bigPicture.classList.add('hidden');
    commentCount = 5;
    deleteComment();
    document.body.classList.remove('modal-open');
    bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
    document.removeEventListener('keydown', onBigPictureEscPress);
    socialLoadMore.removeEventListener('click', onSocialLoadMoreClick);
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
