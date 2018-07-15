'use strict';
(function () {
  var filter = document.querySelector('.img-filters');
  var popularFilter = filter.querySelector('#filter-popular');
  var newFilter = filter.querySelector('#filter-new');
  var discussedFilter = filter.querySelector('#filter-discussed');
  var photoGallery;


  var onPopularFilterClick = window.debounce(function () {
    newFilter.classList.remove('img-filters__button--active');
    popularFilter.classList.add('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    photoGallery = window.backend.sourceData.slice(0);
    window.pictures.deletePhotoGallery();
    window.pictures.fillPhotoGallery(photoGallery);
  });

  var onNewFilterClick = window.debounce(function () {
    newFilter.classList.add('img-filters__button--active');
    popularFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    photoGallery = window.backend.sourceData.slice(0);
    var MAX_NEW_PHOTO = 10;
    var maxGalleryLength = photoGallery.length;
    for (var i = 0; i < maxGalleryLength - MAX_NEW_PHOTO; i++) {
      photoGallery.splice(window.util.generateNaturalNumber(0, photoGallery.length - 1), 1);
    }
    window.pictures.deletePhotoGallery();
    window.pictures.fillPhotoGallery(photoGallery);
  });

  var onDiscussedFilterClick = window.debounce(function () {
    newFilter.classList.remove('img-filters__button--active');
    popularFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.add('img-filters__button--active');
    photoGallery = window.backend.sourceData.slice(0);
    photoGallery.sort(function (firstObject, secondObject) {
      return secondObject.comments.length - firstObject.comments.length;
    });
    window.pictures.deletePhotoGallery();
    window.pictures.fillPhotoGallery(photoGallery);
  });

  window.filter = {
    onSuccessFill: function () {
      filter.classList.remove('img-filters--inactive');
      popularFilter.addEventListener('click', onPopularFilterClick);
      popularFilter.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, onPopularFilterClick);
      });
      newFilter.addEventListener('click', onNewFilterClick);
      newFilter.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, onNewFilterClick);
      });
      discussedFilter.addEventListener('click', onDiscussedFilterClick);
      discussedFilter.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, onDiscussedFilterClick);
      });
    }
  };
})();
