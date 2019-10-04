'use strict';

(function() {

  var addEffects = function(img) {
    var ZERO = 0;
    var SCALE_MAX = 453;
    var MAX_PERCENT = 100;
    var EFFECT_INDEX = 1;

    var effectPatterns = {
      chrome: {
        name: 'grayscale',
        unit: '',
        minValue: 0,
        maxValue: 1
      },

      sepia: {
        name: 'sepia',
        unit: '',
        minValue: 0,
        maxValue: 1
      },

      marvin: {
        name: 'invert',
        unit: '%',
        minValue: 0,
        maxValue: 100
      },

      phobos: {
        name: 'blur',
        unit: 'px',
        minValue: 0,
        maxValue: 3
      },

      heat: {
        name: 'brightness',
        unit: '',
        minValue: 1,
        maxValue: 3
      },
    };

    var effects = img.querySelectorAll('.effects__radio');

    var imgUploadScale = img.querySelector('.img-upload__scale');
    var imgUploadPreview = img.querySelector('.img-upload__preview img');

    var scaleValue = img.querySelector('.scale__value');

    var scalePin = img.querySelector('.scale__pin');
    var scaleLevel = img.querySelector('.scale__level');

    var findEffectValue = function(minValue, maxValue, percent) {
      return minValue + (maxValue - minValue) / MAX_PERCENT * percent;
    };

    var calculateEffect = function(effect, value) {
      imgUploadPreview.style.filter = effect.name + '(' + findEffectValue(effect.minValue, effect.maxValue, value) + effect.unit + ')';
    };

    var calculateEffectLevel = function(inputValue) {
      var effectName = imgUploadPreview.className.split('--')[EFFECT_INDEX];
      if (!effectName) {
        imgUploadPreview.style.filter = '';
        return;
      }

      calculateEffect(effectPatterns[effectName], inputValue);
    };

    var changePinValue = function(shift) {
      var changeScalePinX = function() {
        var offset = scalePin.offsetLeft - shift;
        if (offset < ZERO) {
          offset = ZERO;
        }
        if (offset > SCALE_MAX) {
          offset = SCALE_MAX;
        }

        return offset;
      };
      var newScalePinX = changeScalePinX();
      var offsetPercent = newScalePinX / SCALE_MAX * MAX_PERCENT;
      scalePin.style.left = newScalePinX + 'px';
      scaleLevel.style.width = offsetPercent + '%';
      scaleValue.value = Math.round(offsetPercent);
      calculateEffectLevel(scaleValue.value);
    };

    scalePin.addEventListener('mousedown', function(evt) {
      var startX = evt.clientX;

      var mouseMoveHandler = function(moveEvt) {
        moveEvt.preventDefault();
        var shiftX = startX - moveEvt.clientX;
        startX = moveEvt.clientX;
        changePinValue(shiftX);
      };

      var mouseUpHandler = function() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };


      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });


    for (var i = 0; i < effects.length; i++) {
      effects[i].addEventListener('change', function(evt) {
        imgUploadPreview.classList = '';
        if (evt.target.value === 'none') {
          imgUploadScale.classList.add('hidden');
        } else {
          imgUploadScale.classList.remove('hidden');

          imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
        }

        changePinValue(-SCALE_MAX);
      });
    }
  };

  window.addEffects = addEffects;

})();
