'use strict';

var uploadFile = document.querySelector('#upload-file');
var editPicture = document.querySelector('.img-upload__overlay');
var editPictureClose = editPicture.querySelector('#upload-cancel');

var scalePin = editPicture.querySelector('.scale__pin');
var scaleLevel = editPicture.querySelector('.scale__level');
var scaleValue = editPicture.querySelector('.scale__value');

var drawSlider = function () {
  scalePin.style.left = propertyLevel + '%';
  scaleLevel.style.width = propertyLevel + '%';
  scaleValue.value = propertyLevel;
};

var onSliderMouseUp = function () {
  propertyLevel = 80; /*временно*/
  drawSlider();
  editEffectsProperty(indexNumber);
};

var effectsProperty = [
  'none',
  'grayscale(0.2)',
  'sepia(0.2)',
  'invert(20%)',
  'blur(0.6px)',
  'brightness(0.6)'
];

/*var ORIGINAL_INDEX = 0;*/
var CHROME_INDEX = 1;
var SEPIA_INDEX = 2;
var MARVIN_INDEX = 3;
var FOBOS_INDEX = 4;
var HEAT_INDEX = 5;

var pictureFilter = editPicture.querySelector('.img-upload__preview');
var effectsItem = editPicture.querySelectorAll('.effects__item');
var propertyLevel = 20;
var indexNumber = 0;

var editEffectsProperty = function (index) {
  switch (index) {
    case CHROME_INDEX:
      effectsProperty[index] = 'grayscale(' + (propertyLevel / 100) + ')';
      break;
    case SEPIA_INDEX:
      effectsProperty[index] = 'sepia(' + (propertyLevel / 100) + ')';
      break;
    case MARVIN_INDEX:
      effectsProperty[index] = 'invert(' + propertyLevel + '%)';
      break;
    case FOBOS_INDEX:
      effectsProperty[index] = 'blur(' + (3 * propertyLevel / 100) + 'px)';
      break;
    case HEAT_INDEX:
      effectsProperty[index] = 'brightness(' + (3 * propertyLevel / 100) + ')';
      break;
  }
  pictureFilter.style.filter = effectsProperty[index];
};

var addEffectsProperty = function (index) {
  effectsItem[index].addEventListener('click', function () {
    propertyLevel = 20;
    editEffectsProperty(index);
    indexNumber = index;
    drawSlider();
  });
};

var onClosePopupClick = function () {
  closeEditPopup();
};

var ESC_KEYCODE = 27;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditPopup();
  }
};

uploadFile.addEventListener('change', function () {
  openEditPopup();
});

var openEditPopup = function () {
  editPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  editPictureClose.addEventListener('click', onClosePopupClick);
  scalePin.addEventListener('mouseup', onSliderMouseUp);
  for (var i = 0; i < effectsItem.length; i++) {
    addEffectsProperty(i);
  }
};

var closeEditPopup = function () {
  editPicture.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
  editPictureClose.removeEventListener('click', onClosePopupClick);
  scalePin.removeEventListener('mouseup', onSliderMouseUp);
};
