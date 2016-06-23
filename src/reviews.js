'use strict';
(function() {
/**@constant {string}*/
  var REWIEVS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

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

  var getReviewElement = function(review) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-text').textContent = review.description;
    var avatar = element.querySelector('.review-author');
    reviewsContainer.appendChild(element);
    var authorAvatar = new Image();
    var authorAvatarLoadTimeout;
    var authorNameAlt = review.author.name;

    authorAvatar.onload = function() {
      clearTimeout(authorAvatarLoadTimeout);
      avatar.src = authorAvatar.src;
      avatar.alt = authorNameAlt;
      avatar.title = review.author.name;
      avatar.style.width = '124px';
      avatar.style.height = '124px';
    };

    authorAvatar.onerror = function() {
      element.classList.add('review-load-failure');
    };

    authorAvatar.src = review.author.picture;

    authorAvatarLoadTimeout = setTimeout(function() {
      authorAvatar = '';
      element.classList.add('review-load-failure');
    }, 10000);

    return element;
  };

  /** @param {function(Array.<Object>)} callback */
  var getReviews = function(callback) {
    var xhr = new XMLHttpRequest();
    /** @param {ProgressEvent} */
    xhr.onreadystatechange = function(evt) {
      if (this.readyState === 4) {
        var loadedData = JSON.parse(evt.target.response);
        elementToClone.classList.remove('reviews-list-loading');
        callback(loadedData);
      }
      if (this.readyState === 2 || this.readyState === 3) {
        elementToClone.classList.add('reviews-list-loading');
      }
      if (this.status === 404) {
        reviewsContainer.classList.add('reviews-load-failure');
      }
    };

    xhr.open('GET', REWIEVS_LOAD_URL);
    xhr.send();
  };
/** @param {Array.<Object>} reviews */
  var renderReviews = function(reviews) {
    reviews.forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
  };

  getReviews(function(loadedReviews) {
    var reviews = loadedReviews;
    renderReviews(reviews);
  });

  refiewFilter.classList.remove('invisible');
})();
