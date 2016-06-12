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
  var newField = document.createElement('label');

  newField.innerHTML = '';
  div.insertBefore(newField, div.children[2]);

  button.setAttribute('disabled', 'disabled');
  reviewName.setAttribute('required', 'required');
  reviewText.setAttribute('required', 'required');

  reviewText.addEventListener('keyup', function(evt) {
    if (reviewText.validity.valid) {
      fieldText.remove();
      fieldText2.remove();
      evt.preventDefault();
    } else {
      newField.parentNode.insertBefore(fieldText2, newField.nextSibling);
    }
  }, true);

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

})();
