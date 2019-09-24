'use strict';

(function() {
  var ESC_KEYCODE = 27;

  var getRandomValue = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomArrayValue = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var isKeydownEsc = function(evt, callback, addCondition) {
    if (evt.keyCode === ESC_KEYCODE && addCondition) {
      callback();
    }
  };

  window.util = {
    getRandomValue: getRandomValue,
    getRandomArrayValue: getRandomArrayValue,
    isKeydownEsc: isKeydownEsc
  };
})();
