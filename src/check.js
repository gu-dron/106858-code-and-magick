'use strict';

function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  } else if (typeof a === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  } else if (Array.isArray(a) && Array.isArray(b)) {
    var length = b.reduce(function (pre, current, index) {
      if (a[index]) {
        return pre + (current * a[index]);
      } else {
        return pre + current;
      }
    });
    return 'Я прошёл ' + length + ' метров';
  } else if (Array.isArray(a)) {
    var sum = a.reduce(function(pre, current) {
      return pre + current;
    });
    return 'Я прошёл ' + sum + ' шагов';
  }
}