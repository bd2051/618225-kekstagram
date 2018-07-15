'use strict';
(function () {
  var filter = document.querySelector('.img-filters');
  var popularFilter = filter.querySelector('#filter-popular');
  var newFilter = filter.querySelector('#filter-new');
  var discussedFilter = filter.querySelector('#filter-discussed');
  var photoGallery;
  var onPopularFilterClick = function () {
    photoGallery = window.backend.sourceData.slice(0);
    window.pictures.deletePhotoGallery();
    window.pictures.fillPhotoGallery(photoGallery);
  };
  var onNewFilterClick = function () {
    photoGallery = window.backend.sourceData.slice(0);
    var MAX_NEW_PHOTO = 10;
    var maxGalleryLength = photoGallery.length;
    for (var i = 0; i < maxGalleryLength - MAX_NEW_PHOTO; i++) {
      photoGallery.splice(window.util.generateNaturalNumber(0, photoGallery.length - 1), 1);
    }
    window.pictures.deletePhotoGallery();
    window.pictures.fillPhotoGallery(photoGallery);
  };
  var onDiscussedFilterClick = function () {
    photoGallery = window.backend.sourceData.slice(0);
    photoGallery.sort(function (firstObject, secondObject) {
      return secondObject.comments.length - firstObject.comments.length;
    });
    window.pictures.deletePhotoGallery();
    window.pictures.fillPhotoGallery(photoGallery);
  };
  window.filter = {
    onSuccessFill: function () {
      filter.classList.remove('img-filters--inactive');
      popularFilter.addEventListener('click', onPopularFilterClick);
      newFilter.addEventListener('click', onNewFilterClick);
      discussedFilter.addEventListener('click', onDiscussedFilterClick);
    }
  };
})();
