'use strict';

(function () {
  var ESC_KEYCODE = 27;
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
    }
  };
})();
