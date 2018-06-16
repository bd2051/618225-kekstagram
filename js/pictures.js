'use strict';

var createRandomPhoto = function (photoNumber, maxLikes, minLikes, photoComments, photoDescription) {
  var createRandomComment = function (comments) {
    var max = comments.length - 1;
    var min = 1;
    var randomNumber = Math.floor(Math.random() * max);
    var comment = comments[randomNumber];
    if (Math.round(Math.random())) {
      randomNumber += Math.floor(Math.random() * (max - min) + min);
      randomNumber -= (randomNumber > max) ? comments.length  : 0;
      return comment + ' ' + comments[randomNumber];
    }
    return comment;
  };
  return {
    url: 'photos/' + photoNumber + '.jpg',
    likes: Math.floor(Math.random() * (maxLikes - minLikes) + minLikes),
    comments: createRandomComment(photoComments),
    description: photoDescription[Math.floor(Math.random() * (photoDescription.length - 1))]
  };
};

var createPhotoGallery = function () {
  var PHOTOS_NUMBER = 25;
  var MAX_LIKES = 200;
  var MIN_LIKES = 15;
  var randomComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var randomDescription = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!',
  ];
  var photos = [];
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    photos[i] = createRandomPhoto(i + 1, MAX_LIKES, MIN_LIKES, randomComments, randomDescription);
  }
  return photos;
}

var photoGallery = createPhotoGallery();
