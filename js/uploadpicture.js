'use strict';

(function () {
  var ORIGINAL_INDEX = 0;
  var CHROME_INDEX = 1;
  var SEPIA_INDEX = 2;
  var MARVIN_INDEX = 3;
  var FOBOS_INDEX = 4;
  var HEAT_INDEX = 5;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;
  var INVALID_COLOR = '#FFDDDD';
  var INVALID_STYLE = '1px solid red';
  var MAX_NUMBER_HASHTAG = 5;
  var SPEСIAL_SYMBOL = '[^#0-9a-zA-Z_а-яёА-ЯЁ ]';
  var MIN_PROPERTY_LEVEL = 0;
  var MAX_PROPERTY_LEVEL = 100;
  var PERSENT = 100;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var editPicture = uploadForm.querySelector('.img-upload__overlay');
  var editPictureClose = editPicture.querySelector('#upload-cancel');
  var propertyLevel = MAX_PROPERTY_LEVEL;

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
      var shift = (startCoord - moveEvt.clientX) * PERSENT / width;
      startCoord = moveEvt.clientX;
      if (startCoord < leftSide) {
        shift = 0;
        propertyLevel = MIN_PROPERTY_LEVEL;
      } else if (startCoord > rightSide) {
        shift = 0;
        propertyLevel = MAX_PROPERTY_LEVEL;
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

  var effects = [
    'none',
    'grayscale(0.2)',
    'sepia(0.2)',
    'invert(20%)',
    'blur(0.6px)',
    'brightness(0.6)'
  ];

  var pictureFilter = editPicture.querySelector('.img-upload__preview');
  var effectsItem = editPicture.querySelectorAll('.effects__item');
  var indexNumber = 0;

  var editEffectsProperty = function (index) {
    var level = Math.round(propertyLevel);
    switch (index) {
      case CHROME_INDEX:
        effects[index] = 'grayscale(' + (level / PERSENT) + ')';
        break;
      case SEPIA_INDEX:
        effects[index] = 'sepia(' + (level / PERSENT) + ')';
        break;
      case MARVIN_INDEX:
        effects[index] = 'invert(' + level + '%)';
        break;
      case FOBOS_INDEX:
        effects[index] = 'blur(' + (3 * level / PERSENT) + 'px)';
        break;
      case HEAT_INDEX:
        effects[index] = 'brightness(' + (3 * level / PERSENT) + ')';
        break;
    }
    pictureFilter.style.filter = effects[index];
  };

  var addEffectsProperty = function (i) {
    propertyLevel = MAX_PROPERTY_LEVEL;
    editEffectsProperty(i);
    indexNumber = i;
    if (indexNumber === ORIGINAL_INDEX) {
      scale.classList.add('visually-hidden');
    } else {
      scale.classList.remove('visually-hidden');
    }
    drawSlider();
  };

  // Масштабируем загружаемую картинку

  var controlMinus = editPicture.querySelector('.resize__control--minus');
  var controlPlus = editPicture.querySelector('.resize__control--plus');
  var controlValue = editPicture.querySelector('.resize__control--value');
  var scalePicture = MAX_SCALE;

  var addScaleProperty = function () {
    controlValue.value = scalePicture + '%';
    pictureFilter.style.transform = 'scale(' + scalePicture / PERSENT + ')';
  };

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

  // Объявление функций событий (кроме событий слайдера и отправки формы)

  var onFiltersClick = [];

  var addEffectsPropertyListener = function (index) {
    var onFilterClick = function () {
      addEffectsProperty(index);
    };
    effectsItem[index].addEventListener('click', onFilterClick);
    return onFilterClick;
  };

  var deleteEffectsPropertyListener = function (index) {
    effectsItem[index].removeEventListener('click', onFiltersClick[index]);
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
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onPopupEscPress);
    editPictureClose.addEventListener('click', onClosePopupClick);
    scalePin.addEventListener('mousedown', onSliderMouseDown);
    for (var i = 0; i < effectsItem.length; i++) {
      onFiltersClick[i] = addEffectsPropertyListener(i);
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
    document.body.classList.remove('modal-open');

    uploadForm.reset();
    addEffectsProperty(ORIGINAL_INDEX);
    scalePicture = MAX_SCALE;
    addScaleProperty();

    document.removeEventListener('keydown', onPopupEscPress);
    editPictureClose.removeEventListener('click', onClosePopupClick);
    scalePin.removeEventListener('mousedown', onSliderMouseDown);
    for (var i = 0; i < effectsItem.length; i++) {
      deleteEffectsPropertyListener(i);
    }
    controlMinus.removeEventListener('click', onControlMinusClick);
    controlPlus.removeEventListener('click', onControlPlusClick);
    textHashtags.removeEventListener('input', onHashtagsInput);
    uploadForm.removeEventListener('submit', onFormSubmit);
  };

  // Проверка хэштегов

  var textHashtags = editPicture.querySelector('.text__hashtags');
  var hashtags;

  var changeErrorStyle = function (inputField) {
    inputField.style.background = INVALID_COLOR;
    inputField.style.outline = INVALID_STYLE;
  };

  var blockInputField = function (inputField, inputMassive) {
    changeErrorStyle(inputField);
    inputField.maxLength = changeMaxLength(inputMassive);
  };

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

  var onHashtagsInput = function () {
    textHashtags.style.background = '';
    textHashtags.style.outline = '';
    textHashtags.removeAttribute('maxLength');
    textHashtags.setCustomValidity('');

    hashtags = textHashtags.value;

    if (hashtags.search(SPEСIAL_SYMBOL) !== -1) {
      textHashtags.setCustomValidity('Хэш-тег не может содержать спецсимволы');
      blockInputField(textHashtags, hashtags);
    }

    hashtags = convertHashtagsMassive(hashtags);

    if (hashtags.length > MAX_NUMBER_HASHTAG) {
      textHashtags.setCustomValidity('Хэш-тегов не может быть больше пяти');
      blockInputField(textHashtags, hashtags);
    } else {
      for (var i = 0; i < hashtags.length; i++) {
        if (hashtags[i].charAt(0) !== '#') {
          textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа #');
          blockInputField(textHashtags, hashtags);
          break;
        } else if (hashtags[i].length === 1 && i < (hashtags.length - 1)) {
          textHashtags.setCustomValidity('Хэш-тег не может содержать единственный символ #');
          blockInputField(textHashtags, hashtags);
          break;
        } else if (hashtags[i].charAt(1) === '#') {
          textHashtags.setCustomValidity('Лишний символ #');
          blockInputField(textHashtags, hashtags);
          break;
        } else if (hashtags[i].length > 20) {
          textHashtags.setCustomValidity('Хэш-тег не может содержать больше двадцати символов');
          blockInputField(textHashtags, hashtags);
          break;
        }
      }
    }

    textHashtags.reportValidity();
  };

  // Отправка формы

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
        changeErrorStyle(textHashtags);
        evt.preventDefault();
        break;
      } else if (hashtags[i].length === 1) {
        textHashtags.setCustomValidity('Хэш-тег не может содержать единственный символ #');
        changeErrorStyle(textHashtags);
        evt.preventDefault();
        break;
      }
    }
    textHashtags.reportValidity();
    if (uploadForm.checkValidity()) {
      window.backend.save(new FormData(uploadForm), onSucsessLoad, onErrorLoad);
      document.querySelector('.img-upload__submit').blur();
    }
  };

  var onSucsessLoad = function () {
    closeEditPopup();
    window.util.createMessage('Успех!');
  };

  var onErrorLoad = function (errorMessage) {
    var ErrorTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');

    var drawErrorMessage = function () {
      var ErrorElement = ErrorTemplate.cloneNode(true);
      ErrorElement.classList.remove('hidden');
      return ErrorElement;
    };

    var fragment = document.createDocumentFragment();
    fragment.appendChild(drawErrorMessage());
    document.body.appendChild(fragment);

    var node = document.createElement('div');
    node.style = 'line-height: 30px';
    node.textContent = errorMessage;

    var errorLinks = document.querySelector('.error__links');
    errorLinks.insertAdjacentElement('beforebegin', node);
    editPicture.classList.add('hidden');

    var oneMoreTime = errorLinks.querySelector('.one-more-time');

    var otherFile = errorLinks.querySelector('.other-file');
    oneMoreTime.addEventListener('click', function (e) {
      onFormSubmit(e);
      document.body.removeChild(document.querySelector('.img-upload__message--error'));
    });
    otherFile.addEventListener('click', function () {
      closeEditPopup();
      document.body.removeChild(document.querySelector('.img-upload__message--error'));
    });
  };
})();
