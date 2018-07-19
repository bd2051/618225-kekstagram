'use strict';
(function () {
  var MAX_NEW_PHOTO = 10;
  var filter = document.querySelector('.img-filters');
  var popularFilter = filter.querySelector('#filter-popular');
  var newFilter = filter.querySelector('#filter-new');
  var discussedFilter = filter.querySelector('#filter-discussed');
  var originalPhotos;
  var filtredPhotos;

  var filtratePhotoGallery = function (button, cb) {
    filter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
    if (typeof cb === 'function') {
      cb();
    } else {
      filtredPhotos = originalPhotos.slice(0);
    }
    window.pictures.deletePhotoGallery();
    window.pictures.fillPhotoGallery(filtredPhotos);
  };

  var createNewPhotoGallery = function () {
    filtredPhotos = originalPhotos.slice(0);
    for (var i = 0; i < originalPhotos.length - MAX_NEW_PHOTO; i++) {
      filtredPhotos.splice(window.util.generateNaturalNumber(0, filtredPhotos.length - 1), 1);
    }
  };

  var createDiscussedPhotoGallery = function () {
    filtredPhotos = originalPhotos.slice(0);
    filtredPhotos.sort(function (firstObject, secondObject) {
      return secondObject.comments.length - firstObject.comments.length;
    });
  };

  var onPopularFilterClick = window.debounce(function () {
    filtratePhotoGallery(popularFilter);
  });

  var onNewFilterClick = window.debounce(function () {
    filtratePhotoGallery(newFilter, createNewPhotoGallery);
  });

  var onDiscussedFilterClick = window.debounce(function () {
    filtratePhotoGallery(discussedFilter, createDiscussedPhotoGallery);
  });

  window.filter = {
    onSuccessFill: function (photos) {
      window.filter.isFilterRun = true;
      originalPhotos = photos.slice(0);
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
    },
    isFilterRun: false
  };
})();
