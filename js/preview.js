'use strict';

(function () {
  var MAX_AVATAR_NUMBER = 6;
  var MIN_AVATAR_NUMBER = 1;
  var BEGIN_COUNT = 0;
  var INITIAL_COMMENT_NUMBER = 5;
  var ADDITIONAL_COMMENT_NUMBER = 5;

  var bigPicture = document.querySelector('.big-picture');
  var socialLoadMore = bigPicture.querySelector('.social__loadmore');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
  var commentList = document.querySelector('.social__comments');
  var commentCount;
  var loadingComments;

  var drawBigPhoto = function (photo, count) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    drawComment(photo.comments, BEGIN_COUNT, count);
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

  var printComment = function (comment) {
    var block = commentTemplate.cloneNode(true);

    var avatarSource = 'img/avatar-' + window.util.generateNaturalNumber(MAX_AVATAR_NUMBER, MIN_AVATAR_NUMBER) + '.svg';
    block.querySelector('.social__picture').src = avatarSource;
    block.querySelector('.social__text').textContent = comment;

    return block;
  };

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
    var comments = commentList.querySelectorAll('.social__comment');
    comments.forEach(function (element) {
      commentList.removeChild(element);
    });
  };

  var onBigPictureCloseClick = function () {
    closeBigPhoto();
  };

  var onBigPictureEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPhoto);
  };

  var onSocialLoadMoreClick = function () {
    drawComment(loadingComments, commentCount, commentCount += ADDITIONAL_COMMENT_NUMBER);
  };

  var openBigPhoto = function (photo) {
    bigPicture.classList.remove('hidden');
    commentCount = INITIAL_COMMENT_NUMBER;
    drawBigPhoto(photo, commentCount);
    document.body.classList.add('modal-open');
    bigPictureClose.addEventListener('click', onBigPictureCloseClick);
    document.addEventListener('keydown', onBigPictureEscPress);
    loadingComments = photo.comments;
    socialLoadMore.addEventListener('click', onSocialLoadMoreClick);
  };

  var closeBigPhoto = function () {
    bigPicture.classList.add('hidden');
    commentCount = INITIAL_COMMENT_NUMBER;
    deleteComment();
    document.body.classList.remove('modal-open');
    bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
    document.removeEventListener('keydown', onBigPictureEscPress);
    socialLoadMore.removeEventListener('click', onSocialLoadMoreClick);
  };

  var addOpeningBigPhoto = function (block, photos, index) {
    block.addEventListener('click', function () {
      openBigPhoto(photos[index]);
    });
  };

  window.preview = {
    onSuccessFill: function (blocks, photos) {
      blocks.forEach(function (element, index) {
        addOpeningBigPhoto(element, photos, index);
      });
    }
  };
})();
