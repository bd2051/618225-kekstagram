'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var drawPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    return pictureElement;
  };

  var pictures = document.querySelector('.pictures');
  var picturesElement;

  window.pictures = {
    fillPhotoGallery: function (photoGallery) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photoGallery.length; i++) {
        fragment.appendChild(drawPhoto(photoGallery[i]));
      }
      pictures.appendChild(fragment);
      picturesElement = pictures.querySelectorAll('.picture__link');
      window.preview.onSuccessFill(picturesElement, photoGallery);
      window.filter.onSuccessFill();
    },
    deletePhotoGallery: function () {
      picturesElement.forEach(function (element) {
        element.remove();
      });
    }
  };

  window.backend.load(window.pictures.fillPhotoGallery, window.util.createMessage);
})();
