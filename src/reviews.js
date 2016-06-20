'use strict';

(function() {
  var refiewFilter = document.querySelector('.reviews-filter');
  refiewFilter.classList.add('invisible');

  var reviewsContainer = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var elementToClone;

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  var getReviewsElement = function(data) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-text').textContent = data.description;
    var avatar = element.querySelector('.review-author');
    reviewsContainer.appendChild(element);
    var authorAvatar = new Image();
    var authorAvatarLoadTimeout;

    authorAvatar.onload = function() {
      clearTimeout(authorAvatarLoadTimeout);
      avatar.src = authorAvatar.src;
      avatar.alt = data.author.name;
      avatar.title = data.author.name;
      avatar.style.width = '124px';
      avatar.style.height = '124px';
    };

    authorAvatar.onerror = function() {
      element.classList.add('review-load-failure');
    };

    authorAvatar.src = data.author.picture;

    authorAvatarLoadTimeout = setTimeout(function() {
      authorAvatar = '';
      element.classList.add('review-load-failure');
    }, 10000);

    return element;
  };
  window.reviews.map(function(review) {
    getReviewsElement(review);
  });

  refiewFilter.classList.remove('invisible');
})();
