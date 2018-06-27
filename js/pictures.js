'use strict';

var generateNaturalNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

var createRandomPhoto = function (photoNumber, maxLikes, minLikes, photoComments, photoDescription) {
  var createRandomComment = function (comments) {
    var maxNumber = comments.length - 1;
    var minNumber = 0;
    var randomNumber = generateNaturalNumber(maxNumber, minNumber);
    var comment = [];
    comment[0] = comments[randomNumber];
    if (Math.round(Math.random())) {
      minNumber = 1;
      randomNumber += generateNaturalNumber(maxNumber, minNumber);
      randomNumber -= (randomNumber > maxNumber) ? comments.length : 0;
      comment[1] = comments[randomNumber];
    }
    return comment;
  };
  return {
    url: 'photos/' + photoNumber + '.jpg',
    likes: generateNaturalNumber(maxLikes, minLikes),
    comments: createRandomComment(photoComments),
    description: photoDescription[generateNaturalNumber(photoDescription.length - 1, 0)]
  };
};

var createPhotoGallery = function () {
  var PHOTOS_NUMBER = 25;
  var MAX_LIKES = 200;
  var MIN_LIKES = 15;
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var description = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!',
  ];
  var photoGallery = [];
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    photoGallery[i] = createRandomPhoto(i + 1, MAX_LIKES, MIN_LIKES, comments, description);
  }
  return photoGallery;
};

var photos = createPhotoGallery();
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var drawPhoto = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments[0];

  return pictureElement;
};

var pictures = document.querySelector('.pictures');
var picturesElement = [];

var fillPhotoGallery = function (photoGallery) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoGallery.length; i++) {
    fragment.appendChild(drawPhoto(photoGallery[i]));
  }
  pictures.appendChild(fragment);
  picturesElement = pictures.querySelectorAll('.picture__link');
};

fillPhotoGallery(photos);

var bigPicture = document.querySelector('.big-picture');

var drawBigPhoto = function (photo) {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  var socialComment = bigPicture.querySelectorAll('.social__comment');
  var MAX_AVATAR_NUMBER = 6;
  var MIN_AVATAR_NUMBER = 1;
  for (var i = 0; i < socialComment.length; i++) {
    if (photo.comments[i]) {
      var avatarSource = 'img/avatar-' + generateNaturalNumber(MAX_AVATAR_NUMBER, MIN_AVATAR_NUMBER) + '.svg';
      socialComment[i].querySelector('.social__picture').src = avatarSource;
      socialComment[i].querySelector('.social__text').textContent = photo.comments[i];
    } else {
      socialComment[i].classList.add('visually-hidden');
    }
  }
  bigPicture.querySelector('.social__caption').textContent = photo.description;
};

var hideBlock = function (blockParent, blockClass) {
  blockParent.querySelector(blockClass).classList.add('visually-hidden');
};

var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var onBigPictureCloseClick = function () {
  closeBigPhoto();
};

var openBigPhoto = function (photo) {
  bigPicture.classList.remove('hidden');
  drawBigPhoto(photo);
  hideBlock(bigPicture, '.social__comment-count');
  hideBlock(bigPicture, '.social__loadmore');
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
};

var closeBigPhoto = function () {
  bigPicture.classList.add('hidden');
};

var addOpeningBigPhoto = function (index) {
  picturesElement[index].addEventListener('click', function () {
    openBigPhoto(photos[index]);
  });
};

for (var i = 0; i < picturesElement.length; i++) {
  addOpeningBigPhoto(i);
}
