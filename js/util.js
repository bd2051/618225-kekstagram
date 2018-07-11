'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.util = {
    generateNaturalNumber: function (max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    hideBlock: function (blockParent, blockClass) {
      blockParent.querySelector(blockClass).classList.add('visually-hidden');
    },
    isEscEvent: function (evt, cb) {
      if (evt.keyCode === ESC_KEYCODE) {
        cb();
      }
    },
    isEnterEvent: function (evt, cb) {
      if (evt.keyCode === ENTER_KEYCODE) {
        cb();
      }
    },
    onErrorLoad: function (errorMessage) {
      var node = document.createElement('div');
      node.style =
        'z-index: 100;' +
        'margin: 0 auto;' +
        'padding: 10px;' +
        'text-align: center;' +
        'background-color: #232321;' +
        'border: 5px solid white;' +
        'width: 40%;' +
        'min-height: 100px;';
      node.style.position = 'absolute';
      node.style.left = '10%';
      node.style.right = '10%';
      node.style.top = '40%';
      node.style.fontSize = '20px';
      node.textContent = errorMessage;
      var nodeButton = document.createElement('button');
      nodeButton.style =
        'display: block;' +
        'margin: 10px auto;' +
        'text-align: center;' +
        'background-color: #232321;' +
        'border: 1px solid white;' +
        'line-height: 40px';
      nodeButton.type = 'button';
      nodeButton.textContent = 'OK';
      document.body.insertAdjacentElement('afterbegin', node);
      node.insertAdjacentElement('beforeend', nodeButton);

      var onErrorMessageEnterPress = function (evt) {
        window.util.isEnterEvent(evt, function () {
          document.body.removeChild(node);
          document.removeEventListener('keydown', onErrorMessageEnterPress);
          nodeButton.removeEventListener('click', onErrorMessageClick);
        });
      };
      var onErrorMessageClick = function () {
        document.body.removeChild(node);
        nodeButton.removeEventListener('click', onErrorMessageClick);
        document.removeEventListener('keydown', onErrorMessageEnterPress);
      };
      document.addEventListener('keydown', onErrorMessageEnterPress);
      nodeButton.addEventListener('click', onErrorMessageClick);
    }
  };
})();
