'use strict';

(function() {
  var URL = 'https://js.dump.academy/kekstagram';
  var makeRequest = function(loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        loadHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function() {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function() {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var loadRequestHandler = function(loadHandler, errorHandler) {
    var xhr = makeRequest(loadHandler, errorHandler);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var saveRequestHandler = function(data, loadHandler, errorHandler) {
    var xhr = makeRequest(loadHandler, errorHandler);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var errorRequestHandler = function(message) {
    var popup = document.createElement('div');
    var paragraph = document.createElement('p');
    var btnClose = document.createElement('button');

    popup.className = 'popup-error';
    btnClose.className = 'btn-error';
    btnClose.textContent = 'OK';
    paragraph.textContent = message;

    popup.appendChild(paragraph);
    popup.appendChild(btnClose);
    document.body.appendChild(popup);

    btnClose.addEventListener('click', function() {
      document.body.removeChild(popup);
    });
  };

  window.backend = {
    loadHandler: loadRequestHandler,
    saveHandler: saveRequestHandler,
    errorHandler: errorRequestHandler
  };
})();
