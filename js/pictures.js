'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictures = document.querySelector('.pictures');
  var picturesElement;

  var drawPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    return pictureElement;
  };

  window.pictures = {
    fillPhotoGallery: function (photos) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photos.length; i++) {
        fragment.appendChild(drawPhoto(photos[i]));
      }
      pictures.appendChild(fragment);
      picturesElement = pictures.querySelectorAll('.picture__link');
      window.preview.onSuccessFill(picturesElement, photos);
      if (!window.filter.isFilterRun) {
        window.filter.onSuccessFill(photos);
      }
    },
    deletePhotoGallery: function () {
      picturesElement.forEach(function (element) {
        element.remove();
      });
    }
  };

  window.backend.load(window.pictures.fillPhotoGallery, window.util.createMessage);
})();
