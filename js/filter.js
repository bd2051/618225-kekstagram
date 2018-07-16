'use strict';
(function () {
  var filter = document.querySelector('.img-filters');
  var popularFilter = filter.querySelector('#filter-popular');
  var newFilter = filter.querySelector('#filter-new');
  var discussedFilter = filter.querySelector('#filter-discussed');
  var photoGallery;

  var filtratePhotoGallery = function (cb, button) {
    newFilter.classList.remove('img-filters__button--active');
    popularFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
    photoGallery = window.backend.sourceData.slice(0);
    cb();
    window.pictures.deletePhotoGallery();
    window.pictures.fillPhotoGallery(photoGallery);
  };

  var createNewPhotoGallery = function () {
    var MAX_NEW_PHOTO = 10;
    var maxGalleryLength = photoGallery.length;
    for (var i = 0; i < maxGalleryLength - MAX_NEW_PHOTO; i++) {
      photoGallery.splice(window.util.generateNaturalNumber(0, photoGallery.length - 1), 1);
    }
  };

  var createDiscussedPhotoGallery = function () {
    photoGallery.sort(function (firstObject, secondObject) {
      return secondObject.comments.length - firstObject.comments.length;
    });
  };

  var onPopularFilterClick = window.debounce(function () {
    filtratePhotoGallery(function () {}, popularFilter);
  });

  var onNewFilterClick = window.debounce(function () {
    filtratePhotoGallery(createNewPhotoGallery, newFilter);
  });

  var onDiscussedFilterClick = window.debounce(function () {
    filtratePhotoGallery(createDiscussedPhotoGallery, discussedFilter);
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
