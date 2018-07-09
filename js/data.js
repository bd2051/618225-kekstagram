'use strict';

(function () {
  var createRandomPhoto = function (photoNumber, maxLikes, minLikes, photoComments, photoDescription) {
    var createRandomComment = function (comments) {
      var maxNumber = comments.length - 1;
      var minNumber = 0;
      var randomNumber = window.util.generateNaturalNumber(maxNumber, minNumber);
      var comment = [];
      comment[0] = comments[randomNumber];
      if (Math.round(Math.random())) {
        minNumber = 1;
        randomNumber += window.util.generateNaturalNumber(maxNumber, minNumber);
        randomNumber -= (randomNumber > maxNumber) ? comments.length : 0;
        comment[1] = comments[randomNumber];
      }
      return comment;
    };
    return {
      url: 'photos/' + photoNumber + '.jpg',
      likes: window.util.generateNaturalNumber(maxLikes, minLikes),
      comments: createRandomComment(photoComments),
      description: photoDescription[window.util.generateNaturalNumber(photoDescription.length - 1, 0)]
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

  window.data = {
    photos: createPhotoGallery()
  };
})();
