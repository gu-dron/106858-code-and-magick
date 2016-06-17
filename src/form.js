'use strict';

(function() {

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');
  var button = document.querySelector('.review-submit');
  var fieldName = document.querySelector('.review-fields-name');
  var fieldText = document.querySelector('.review-fields-text');
  var fieldName2 = fieldName.cloneNode(true);
  var fieldText2 = fieldText.cloneNode(true);
  var div = document.querySelector('.review-fields');
  var labelComment = div.children[2];
  var newField = document.createElement('label');
  var markLabel = document.querySelectorAll('.review-mark-label');
  var form = document.querySelector('.review-form');
  var reviewMark = form.elements['review-mark'];

  newField.innerHTML = '';
  div.insertBefore(newField, labelComment);

  button.setAttribute('disabled', 'disabled');
  reviewName.setAttribute('required', 'required');

  function checkFieldText() {
    reviewText.addEventListener('keyup', function(evt) {
      if (reviewText.value.length > 0) {
        fieldText.remove();
        fieldText2.remove();
        evt.preventDefault();
      } else {
        newField.parentNode.insertBefore(fieldText2, newField.nextSibling);
      }
    }, false);
  }

  checkFieldText();

  function checkFieldName() {
    reviewName.addEventListener('keyup', function(evt) {
      if (reviewName.validity.valid) {
        button.removeAttribute('disabled', 'disabled');
        fieldName.remove();
        fieldName2.remove();
        evt.preventDefault();
      } else {
        button.setAttribute('disabled', 'disabled');
        newField.parentNode.insertBefore(fieldName2, newField.previousSibling);
      }
    }, false);
  }

  checkFieldName();

  function checkMark() {
    markLabel[0].addEventListener('mousedown', function(evt) {
      reviewText.setAttribute('required', 'required');
      evt.preventDefault();
    }, false);

    markLabel[1].addEventListener('mousedown', function(evt) {
      reviewText.setAttribute('required', 'required');
      evt.preventDefault();
    }, false);

    markLabel[2].addEventListener('mousedown', function(evt) {
      reviewText.removeAttribute('required', 'required');
      evt.preventDefault();
    }, false);

    markLabel[3].addEventListener('mousedown', function(evt) {
      reviewText.removeAttribute('required', 'required');
      evt.preventDefault();
    }, false);

    markLabel[4].addEventListener('mousedown', function(evt) {
      reviewText.removeAttribute('required', 'required');
      evt.preventDefault();
    }, false);
  }

  checkMark();

  var browserCookies = require('browser-cookies');

  reviewName.value = browserCookies.get('name');
  reviewMark.value = browserCookies.get('mark');

  button.onclick = function() {
    var date = Date.now();
    var year = new Date();
    var birthDate = new Date(year.getFullYear(), 0, 14);
    if (year < birthDate) {
      birthDate.setFullYear(birthDate.getFullYear() - 1);
    }
    var birthDateMs = birthDate.valueOf();
    var differenceDate = (date - birthDateMs);
    var dateToExpire = Date.now() + differenceDate;
    var formatedDateToExpire = new Date(dateToExpire).toUTCString();

    browserCookies.set('name', reviewName.value, {expires: formatedDateToExpire});
    browserCookies.set('mark', reviewMark.value, {expires: formatedDateToExpire});
  };

})();
