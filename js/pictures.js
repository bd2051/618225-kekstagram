'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesGallery = document.querySelector('.pictures');
  var pictures;

  var drawPhoto = function (photo) {
    var block = pictureTemplate.cloneNode(true);

    block.querySelector('.picture__img').src = photo.url;
    block.querySelector('.picture__stat--likes').textContent = photo.likes;
    block.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    return block;
  };

  window.pictures = {
    fillPhotoGallery: function (photos) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photos.length; i++) {
        fragment.appendChild(drawPhoto(photos[i]));
      }
      picturesGallery.appendChild(fragment);
      pictures = picturesGallery.querySelectorAll('.picture__link');
      window.preview.onSuccessFill(pictures, photos);
      if (!window.filter.isFilterRun) {
        window.filter.onSuccessFill(photos);
      }
    },
    deletePhotoGallery: function () {
      pictures.forEach(function (element) {
        element.remove();
      });
    }
  };

  window.backend.load(window.pictures.fillPhotoGallery, window.util.createMessage);
})();
