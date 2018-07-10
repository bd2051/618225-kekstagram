'use strict';

(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var editPicture = uploadForm.querySelector('.img-upload__overlay');
  var editPictureClose = editPicture.querySelector('#upload-cancel');

  // Изменение положения слайдера
  var scale = editPicture.querySelector('.img-upload__scale');
  var scaleValue = scale.querySelector('.scale__value');
  var scaleLine = scale.querySelector('.scale__line');
  var scalePin = scaleLine.querySelector('.scale__pin');
  var scaleLevel = scaleLine.querySelector('.scale__level');

  var drawSlider = function () {
    var level = Math.round(propertyLevel);
    scalePin.style.left = level + '%';
    scaleLevel.style.width = level + '%';
    scaleValue.value = level;
  };

  var onSliderMouseDown = function (evt) {
    evt.preventDefault();
    var startCoord = evt.clientX;
    var leftSide = scaleLine.getBoundingClientRect().left;
    var width = scaleLine.getBoundingClientRect().width;
    var rightSide = leftSide + width;

    var onSliderMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = (startCoord - moveEvt.clientX) * 100 / width;
      startCoord = moveEvt.clientX;
      if (startCoord < leftSide) {
        shift = 0;
        propertyLevel = 0;
      } else if (startCoord > rightSide) {
        shift = 0;
        propertyLevel = 100;
      } else {
        propertyLevel = propertyLevel - shift;
      }
      drawSlider();
      editEffectsProperty(indexNumber);
    };

    var onSliderMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onSliderMove);
      document.removeEventListener('mouseup', onSliderMouseUp);
    };

    document.addEventListener('mousemove', onSliderMove);
    document.addEventListener('mouseup', onSliderMouseUp);
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
  var propertyLevel = 100;
  var indexNumber = 0;

  var editEffectsProperty = function (index) {
    var level = Math.round(propertyLevel);
    switch (index) {
      case CHROME_INDEX:
        effectsProperty[index] = 'grayscale(' + (level / 100) + ')';
        break;
      case SEPIA_INDEX:
        effectsProperty[index] = 'sepia(' + (level / 100) + ')';
        break;
      case MARVIN_INDEX:
        effectsProperty[index] = 'invert(' + level + '%)';
        break;
      case FOBOS_INDEX:
        effectsProperty[index] = 'blur(' + (3 * level / 100) + 'px)';
        break;
      case HEAT_INDEX:
        effectsProperty[index] = 'brightness(' + (3 * level / 100) + ')';
        break;
    }
    pictureFilter.style.filter = effectsProperty[index];
  };

  var addEffectsProperty = function (i) {
    propertyLevel = 100;
    editEffectsProperty(i);
    indexNumber = i;
    if (indexNumber === ORIGINAL_INDEX) {
      scale.classList.add('visually-hidden');
    } else {
      scale.classList.remove('visually-hidden');
    }
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

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeEditPopup);
  };

  var onObjectFocus = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onObjectBlur = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Запуск и закрытие окна редактирования

  uploadFile.addEventListener('change', function () {
    openEditPopup();
  });

  var textDescription = editPicture.querySelector('.text__description');

  var openEditPopup = function () {
    editPicture.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    editPictureClose.addEventListener('click', onClosePopupClick);
    scalePin.addEventListener('mousedown', onSliderMouseDown);
    for (var i = 0; i < effectsItem.length; i++) {
      addEffectsPropertyListener(i);
    }
    controlMinus.addEventListener('click', onControlMinusClick);
    controlPlus.addEventListener('click', onControlPlusClick);
    textHashtags.addEventListener('input', onHashtagsInput);
    textHashtags.addEventListener('focus', onObjectFocus);
    textHashtags.addEventListener('blur', onObjectBlur);
    textDescription.addEventListener('focus', onObjectFocus);
    textDescription.addEventListener('blur', onObjectBlur);
    uploadForm.addEventListener('submit', onFormSubmit);
  };

  var closeEditPopup = function () {
    editPicture.classList.add('hidden');

    uploadForm.reset();
    addEffectsProperty(ORIGINAL_INDEX);
    scalePicture = 100;
    addScaleProperty();

    document.removeEventListener('keydown', onPopupEscPress);
    editPictureClose.removeEventListener('click', onClosePopupClick);
    scalePin.removeEventListener('mousedown', onSliderMouseDown);
    controlMinus.removeEventListener('click', onControlMinusClick);
    controlPlus.removeEventListener('click', onControlPlusClick);
    textHashtags.removeEventListener('input', onHashtagsInput);
    uploadForm.removeEventListener('submit', onFormSubmit);
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

  // Проверка хэштегов и отправка формы

  var textHashtags = editPicture.querySelector('.text__hashtags');
  var hashtags;
  var INVALID_COLOR = '#FFDDDD';
  var INVALID_STYLE = '1px solid red';
  var MAX_NUMBER_HASHTAG = 5;
  var SPEСIAL_SYMBOL = '[^#0-9a-zA-Z_а-яёА-ЯЁ ]';

  var changeMaxLength = function (inputMassive) {
    var maxLength = 0;
    for (var i = 0; i < inputMassive.length; i++) {
      maxLength += inputMassive[i].length;
    }
    return maxLength;
  };

  var convertHashtagsMassive = function (stringHashtags) {
    stringHashtags = stringHashtags.toLowerCase();
    var massiveHashtags = stringHashtags.split(' ');
    massiveHashtags = massiveHashtags.filter(function (n) {
      return n.length > 0;
    });
    return massiveHashtags;
  };

  var onSucsessLoad = function () {
    closeEditPopup();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    hashtags = convertHashtagsMassive(textHashtags.value);
    var repeatedHashtags = [];
    for (var i = 0; i < hashtags.length; i++) {
      repeatedHashtags = hashtags.filter(function (n) {
        return n === hashtags[i];
      });
      if (repeatedHashtags.length > 1) {
        textHashtags.setCustomValidity('Хэш-теги не должены повторяться');
        textHashtags.style.background = INVALID_COLOR;
        textHashtags.style.outline = INVALID_STYLE;
        evt.preventDefault();
        break;
      } else if (hashtags[i].length === 1) {
        textHashtags.setCustomValidity('Хэш-тег не может содержать единственный символ #');
        textHashtags.style.background = INVALID_COLOR;
        textHashtags.style.outline = INVALID_STYLE;
        evt.preventDefault();
        break;
      }
    }
    textHashtags.reportValidity();
    if (uploadForm.checkValidity()) {
      window.backend.save(new FormData(uploadForm), onSucsessLoad, window.util.onErrorLoad);
      document.querySelector('.img-upload__submit').blur();
    }
  };

  var onHashtagsInput = function () {
    textHashtags.style.background = '';
    textHashtags.style.outline = '';
    textHashtags.removeAttribute('maxLength');
    textHashtags.setCustomValidity('');

    hashtags = textHashtags.value;

    if (hashtags.search(SPEСIAL_SYMBOL) !== -1) {
      textHashtags.setCustomValidity('Хэш-тег не может содержать спецсимволы');
      textHashtags.style.background = INVALID_COLOR;
      textHashtags.style.outline = INVALID_STYLE;
      textHashtags.maxLength = changeMaxLength(hashtags);
    }

    hashtags = convertHashtagsMassive(hashtags);

    if (hashtags.length > MAX_NUMBER_HASHTAG) {
      textHashtags.setCustomValidity('Хэш-тегов не может быть больше пяти');
      textHashtags.style.background = INVALID_COLOR;
      textHashtags.style.outline = INVALID_STYLE;
      textHashtags.maxLength = changeMaxLength(hashtags);
    } else {
      for (var i = 0; i < hashtags.length; i++) {
        if (hashtags[i].charAt(0) !== '#') {
          textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа #');
          textHashtags.maxLength = changeMaxLength(hashtags);
          textHashtags.style.background = INVALID_COLOR;
          textHashtags.style.outline = INVALID_STYLE;
          break;
        } else if (hashtags[i].length === 1 && i < (hashtags.length - 1)) {
          textHashtags.setCustomValidity('Хэш-тег не может содержать единственный символ #');
          textHashtags.maxLength = changeMaxLength(hashtags);
          textHashtags.style.background = INVALID_COLOR;
          textHashtags.style.outline = INVALID_STYLE;
          break;
        } else if (hashtags[i].charAt(1) === '#') {
          textHashtags.setCustomValidity('Лишний символ #');
          textHashtags.maxLength = changeMaxLength(hashtags);
          textHashtags.style.background = INVALID_COLOR;
          textHashtags.style.outline = INVALID_STYLE;
          break;
        } else if (hashtags[i].length > 20) {
          textHashtags.setCustomValidity('Хэш-тег не может содержать больше двадцати символов');
          textHashtags.maxLength = changeMaxLength(hashtags);
          textHashtags.style.background = INVALID_COLOR;
          textHashtags.style.outline = INVALID_STYLE;
          break;
        }
      }
    }

    textHashtags.reportValidity();
  };
})();
