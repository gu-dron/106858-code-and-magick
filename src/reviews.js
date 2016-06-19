'use strict';
//Объявляем переменную для .reviews-filter
var refiewFilter = document.querySelector('.reviews-filter');

//Прячет блок с фильтрами .reviews-filter, добавляя ему класс invisible
refiewFilter.classList.add('invisible');

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

var IMAGE_LOAD_TIMEOUT = 10000;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var getReviewsElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  var reviewAuthor = element.querySelector('.review-author');
  element.querySelector('.review-rating').textContent = data.rating;
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);

  var authorImage = new Image(124, 124);
  var authorImageLoadTimeout;

    reviewAuthor.src = authorImage;
    reviewAuthor.name = data.author.name;
    reviewAuthor.alt = data.author.name;
    clearTimeout(authorImageLoadTimeout);
  };
  authorImage.onerror = function() {
    element.classList.add('review-load-failure');
  };
  authorImage.src = data.preview;

  authorImage = setTimeout(function() {
    authorImage.src = '';
    element.classList.add('hotel-nophoto');
  }, IMAGE_LOAD_TIMEOUT);
  return element;
};

  getReviewsElement(review, reviewsContainer);
});
