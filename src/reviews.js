'use strict';
(function() {
/**@constant {number}*/
  var SENDING_DATA = 2;
  var RECEIVING_DATA = 3;
  var DATA_UPLOADED = 4;
/**@constant {string}*/
  var REWIEVS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

  var refiewFilter = document.querySelector('.reviews-filter');
  refiewFilter.classList.add('invisible');

  var reviewsContainer = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var elementToClone;
  var reviews = [];
  
  var Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};


/** @constant {Filter} */
var DEFAULT_FILTER = Filter.ALL;

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
      if (this.readyState === DATA_UPLOADED) {
        var loadedData = JSON.parse(evt.target.response);
        elementToClone.classList.remove('reviews-list-loading');
        refiewFilter.classList.remove('invisible');
        debugger;
        callback(loadedData);
      }
      if (this.readyState === SENDING_DATA || this.readyState === RECEIVING_DATA) {
        elementToClone.classList.add('reviews-list-loading');
      }
      if (this.status === 404) {
        reviewsContainer.classList.add('reviews-load-failure');
      }
    };

    xhr.open('GET', REWIEVS_LOAD_URL);
    xhr.send();
  };

  /** @param {Array.<Object>} hotels */
  var renderReviews = function(loadedReviews) {
    debugger;
    reviewsContainer.innerHTML = '';
    loadedReviews.forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
  };

  var getFilteredReviews = function(loadedReviews, filter) {
    debugger;
    var reviewsToFilter = reviews.slice(0);

    switch (filter) {
      case Filter.GOOD:
        return reviewsToFilter
          .filter(function(filterRating){
          return (filterRating.rating >= 3);
        })
        .sort(function(a, b) {
          return (a.rating + b.rating);
        });
        break;
      case Filter.BAD:
        reviewsToFilter.sort(function(a, b) {
          return a.rating + b.rating;
        });
        break;
    }
    return reviewsToFilter;
  };

  /** @param {string} filter */
  var setFilterEnabled = function(filter) {
    var filteredReview = getFilteredReviews(reviews, filter);
    renderReviews(filteredReview);
  };

  var setFiltrationEnabled = function() {
    debugger;
    var filters = refiewFilter.querySelectorAll('.reviews-filter-item');
    for (var i = 0; i < filters.length; i++) {
      filters[i].onclick = function(evt) {
        debugger;
        setFilterEnabled(this.htmlFor);
        evt.preventDefault();
      };
    }
  };

  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFiltrationEnabled();
    debugger;
    setFilterEnabled(DEFAULT_FILTER)
    renderReviews(reviews);
  });

})();