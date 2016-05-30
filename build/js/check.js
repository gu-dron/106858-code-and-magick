function getMessage(a, b) {
    "use strict";
    if (typeof a === 'boolean') {
		if (a) {
			return ('Я попал в ' + b);
		} else { return ('Я никуда не попал'); }
	} else if (typeof a === 'number') {
		return ('Я прыгнул на ' + a * 100 + ' сантиметров');
	} else if (Array.isArray(a) && Array.isArray(b)) {
        var length = 0;
        for (var i = 0; i < a.length; i++) {
          length = length + a[i] * b[i];
        }
            return 'Я прошёл '+ length + ' метров';
    } else if (Array.isArray(a)) {
       var sum = a.reduce(function(a, b) {
                                return a + b
                                });
        return ('Я прошёл ' + sum + ' шагов');
    }		
}

 /*var sum = 0;
        for (var i = 0; i < a.length; i++) {
        sum = sum + a[i];
        }*/