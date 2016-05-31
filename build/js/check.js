'use strict';

function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return ('Я попал в ' + b);
		} else {
            return ('Я никуда не попал');
        }
	} else if (typeof a === 'number') {
        return ('Я прыгнул на ' + a * 100 + ' сантиметров');
	} else if (Array.isArray(a) && Array.isArray(b)) {
        var length = a.reduceRight(function (pre, current, index) {
            return pre + (current * b[index]);
            });
        return 'Я прошёл ' + length + ' метров';
    } else if (Array.isArray(a)) {
       var sum = a.reduce(function(pre, current) {
           return pre + current;
           });
        return ('Я прошёл ' + sum + ' шагов');
    }
}