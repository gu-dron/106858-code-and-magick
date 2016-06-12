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
  var button = document.querySelector('.review-submit');

  button.setAttribute('disabled', 'disabled');
  reviewName.setAttribute('required', 'required');

  reviewName.addEventListener('keyup', function(evt) {
    if (reviewName.validity.valid) {
      button.removeAttribute('disabled', 'disabled');
      evt.preventDefault();
    }
  }, false);

})();
