'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var node = document.createElement('div');
  var nodeButton = document.createElement('button');

  var onMessageEnterPress = function (evt) {
    window.util.isEnterEvent(evt, function () {
      document.body.removeChild(node);
      document.removeEventListener('keydown', onMessageEnterPress);
      nodeButton.removeEventListener('click', onMessageClick);
    });
  };
  var onMessageClick = function () {
    document.body.removeChild(node);
    nodeButton.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageEnterPress);
  };

  window.util = {
    generateNaturalNumber: function (max, min) {
      return Math.floor(Math.random() * (max - min) + min);
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
    createMessage: function (message) {
      node.style = 'z-index: 100; margin: 0 auto;' +
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
      node.textContent = message;
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
      document.addEventListener('keydown', onMessageEnterPress);
      nodeButton.addEventListener('click', onMessageClick);
    }
  };
})();
