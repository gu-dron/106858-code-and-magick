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

  var form = document.querySelector('.review-form');
  var reviewName = document.getElementById('review-name');
  var button = document.querySelector('.review-submit');
  var fieldName = document.querySelector('.review-fields-name');
  var fieldText = document.querySelector('.review-fields-text')
  var reviewMarkTwo = document.getElementById('review-mark-2')

  button.setAttribute('disabled', 'disabled');
  reviewName.setAttribute('required', 'required');

  reviewName.addEventListener('keyup', function (event) {
    if (reviewName.validity.valid) {
      button.removeAttribute('disabled', 'disabled');
    }
  }, false);

})();
