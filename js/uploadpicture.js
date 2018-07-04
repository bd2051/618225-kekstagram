'use strict';

var uploadForm = document.querySelector('.img-upload__form');
var uploadFile = uploadForm.querySelector('#upload-file');
var editPicture = uploadForm.querySelector('.img-upload__overlay');
var editPictureClose = editPicture.querySelector('#upload-cancel');

// Изменение положения слайдера

var scalePin = editPicture.querySelector('.scale__pin');
var scaleLevel = editPicture.querySelector('.scale__level');
var scaleValue = editPicture.querySelector('.scale__value');

var drawSlider = function () {
  scalePin.style.left = propertyLevel + '%';
  scaleLevel.style.width = propertyLevel + '%';
  scaleValue.value = propertyLevel;
};

var onSliderMouseUp = function () {
  propertyLevel = 20; /* временно */
  drawSlider();
  editEffectsProperty(indexNumber);
};

// Изменение фильтра картинки

var effectsProperty = [
  'none',
  'grayscale(0.2)',
  'sepia(0.2)',
  'invert(20%)',
  'blur(0.6px)',
  'brightness(0.6)'
];

var ORIGINAL_INDEX = 0;
var CHROME_INDEX = 1;
var SEPIA_INDEX = 2;
var MARVIN_INDEX = 3;
var FOBOS_INDEX = 4;
var HEAT_INDEX = 5;

var pictureFilter = editPicture.querySelector('.img-upload__preview');
var effectsItem = editPicture.querySelectorAll('.effects__item');
var propertyLevel;
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

var addEffectsProperty = function (i) {
  propertyLevel = 100;
  editEffectsProperty(i);
  indexNumber = i;
  drawSlider();
};

// Объявление функций событий (кроме событий слайдера)

var addEffectsPropertyListener = function (index) {
  effectsItem[index].addEventListener('click', function () {
    addEffectsProperty(index);
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

// Запуск и закрытие окна редактирования

uploadFile.addEventListener('change', function () {
  openEditPopup();
});

var openEditPopup = function () {
  editPicture.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  editPictureClose.addEventListener('click', onClosePopupClick);
  scalePin.addEventListener('mouseup', onSliderMouseUp);
  for (var i = 0; i < effectsItem.length; i++) {
    addEffectsPropertyListener(i);
  }
  controlMinus.addEventListener('click', onControlMinusClick);
  controlPlus.addEventListener('click', onControlPlusClick);
};


var closeEditPopup = function () {
  editPicture.classList.add('hidden');

  uploadForm.reset();
  addEffectsProperty(ORIGINAL_INDEX);
  scalePicture = 100;
  addScaleProperty();

  document.removeEventListener('keydown', onPopupEscPress);
  editPictureClose.removeEventListener('click', onClosePopupClick);
  scalePin.removeEventListener('mouseup', onSliderMouseUp);
  controlMinus.removeEventListener('click', onControlMinusClick);
  controlPlus.removeEventListener('click', onControlPlusClick);
};

// Масштабируем загружаемую картинку

var controlMinus = editPicture.querySelector('.resize__control--minus');
var controlPlus = editPicture.querySelector('.resize__control--plus');
var controlValue = editPicture.querySelector('.resize__control--value');
var scalePicture = 100;

var addScaleProperty = function () {
  controlValue.value = scalePicture + '%';
  pictureFilter.style.transform = 'scale(' + scalePicture / 100 + ')';
};

var MIN_SCALE = 25;
var MAX_SCALE = 100;
var SCALE_STEP = 25;

var onControlMinusClick = function () {
  scalePicture -= SCALE_STEP;
  if (scalePicture < MIN_SCALE) {
    scalePicture = MIN_SCALE;
  }
  addScaleProperty();
};

var onControlPlusClick = function () {
  scalePicture += SCALE_STEP;
  if (scalePicture > MAX_SCALE) {
    scalePicture = MAX_SCALE;
  }
  addScaleProperty();
};
