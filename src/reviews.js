'use strict';
(function() {
/**@constant {number}*/
  var SENDING_DATA = 2;
  var RECEIVING_DATA = 3;
  var DATA_UPLOADED = 4;
/**@constant {string}*/
  var REWIEVS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
  var NOT_FOUND = 404;

  var refiewFilter = document.querySelector('.reviews-filter');
  refiewFilter.classList.add('invisible');

  var reviewsContainer = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var elementToClone;
  var reviews = [];
  var filteredReviews = [];
  var noReviews = document.createElement('div');
  var buttonSwitch = document.createElement('button');

  var Filter = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };
/** @constant {number}*/
  var PAGE_SIZE = 3;
/** @type {number}*/
  var pageNumber = 1;

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

    xhr.onreadystatechange = function(evt) {
      if (this.readyState === DATA_UPLOADED) {
        var loadedData = JSON.parse(evt.target.response);
        elementToClone.classList.remove('reviews-list-loading');
        refiewFilter.classList.remove('invisible');
        callback(loadedData);
      }
      if (this.readyState === SENDING_DATA || this.readyState === RECEIVING_DATA) {
        elementToClone.classList.add('reviews-list-loading');
      }
      if (this.status === NOT_FOUND) {
        reviewsContainer.classList.add('reviews-load-failure');
      }
    };

    xhr.open('GET', REWIEVS_LOAD_URL);
    xhr.send();
  };

  var buttonSwitchPage = function() {
    buttonSwitch.innerHTML = 'Показать еще';
    buttonSwitch.style.background = '#ffffff';
    buttonSwitch.style.lineHeight = '36px';
    buttonSwitch.style.color = '#000000';
    buttonSwitch.style.display = 'table';
    buttonSwitch.style.margin = '0 auto';
    buttonSwitch.style.textAlign = 'center';
    buttonSwitch.style.fontWeight = 'bold';
    buttonSwitch.style.fontSize = '22px';
    buttonSwitch.style.border = 'none';
    buttonSwitch.style.boxShadow = '3px 3px 0 #000000';
    buttonSwitch.style.marginBottom = '30px';
    reviewsContainer.appendChild(buttonSwitch);
  };

  var noMessage = function() {
    noReviews.innerHTML = 'Удовлетворяющей информации не найдено!';
    noReviews.style.marginBottom = '50px';
    noReviews.style.textAlign = 'center';
    noReviews.style.fontSize = '24px';
    reviewsContainer.appendChild(noReviews);
  };

  var renderReviews = function(loadedReviews, page, replace) {
    if (replace) {
      reviewsContainer.innerHTML = '';
      buttonSwitch.classList.remove('invisible');
    } else if (loadedReviews.length <= 3) {
      buttonSwitch.classList.remove('invisible');
    }
    var from = (page * PAGE_SIZE);
    var to = (from + PAGE_SIZE);
    if (loadedReviews.length === 0) {
      noMessage();
    } else {
      loadedReviews.slice(from, to).forEach(function(review) {
        getReviewElement(review, reviewsContainer);
        buttonSwitchPage();
      });
    }
  };

  var getFilteredReviews = function(loadedReviews, filter) {
    var reviewsToFilter = reviews.slice(0);

    switch (filter) {
      case Filter.GOOD:
        return reviewsToFilter.filter(function(filterRating) {
          return (filterRating.rating >= 3);
        })
        .sort(function(a, b) {
          return (b.rating - a.rating);
        });
      case Filter.BAD:
        return reviewsToFilter.filter(function(filterRating) {
          return (filterRating.rating <= 2);
        })
        .sort(function(a, b) {
          return (a.rating - b.rating);
        });
      case Filter.POPULAR:
        return reviewsToFilter.sort(function(a, b) {
          return (b.review_usefulness - a.review_usefulness);
        });
      case Filter.RECENT:
        var dateToCompare = Date.now();
        return reviewsToFilter.filter(function(review) {
          return (dateToCompare < Date.parse(review.date));
        })
        .sort(function(a, b) {
          return (b.date - a.date);
        });
    }
    return reviewsToFilter;
  };

  var setFilterEnabled = function(filter) {
    filteredReviews = getFilteredReviews(reviews, filter);
    pageNumber = 1;
    renderReviews(filteredReviews, pageNumber, true);
  };

  var setFiltrationEnabled = function() {
    refiewFilter.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('reviews-filter-item')) {
        setFilterEnabled(evt.target.htmlFor);
      }
    });

  };

  /**
 * @param {Array} hotels
 * @param {number} page
 * @param {number} pageSize
 * @return {boolean}
 */
  var isNextPageAvailable = function(review, page, pageSize) {
    return page < Math.floor(review.length / pageSize);
  };

  var setClickEnabled = function() {
    buttonSwitch.addEventListener('click', function() {
      if (isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
        pageNumber++;
        renderReviews(filteredReviews, pageNumber);
      } else {
        buttonSwitch.classList.add('invisible');
      }
    });
  };

  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFiltrationEnabled();
    setFilterEnabled();
    setClickEnabled(loadedReviews);
  });

})();
