'use strict';

(function () {
  var URLSave = 'https://js.dump.academy/kekstagram';
  var URLLoad = 'https://js.dump.academy/kekstagram/data';
  var SUCSESS_CODE = 200;
  var LOAD_TIME = 10000;

  var requestData = function (data, onLoad, onError, isSaveFunction) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var errorMessage = isSaveFunction ? '' : 'Данные не загрузились! ';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCSESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError(errorMessage + 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(errorMessage + 'Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError(errorMessage + 'Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = LOAD_TIME;
    if (isSaveFunction) {
      xhr.open('POST', URLSave);
      xhr.send(data);
    } else {
      xhr.open('GET', URLLoad);
      xhr.send();
    }
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      requestData(data, onLoad, onError, true);
    },
    load: function (onLoad, onError) {
      requestData(false, onLoad, onError, false);
    },
  };
})();
