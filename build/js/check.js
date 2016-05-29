function getMessage(a,b) {
	if (typeof a === 'boolean') {
		if(a === true) {
		return ('Я попал в ' + [b]);	
		}
		else {
			return ('Я никуда не попал');
		}
	}
	else if (typeof a === 'number') {
		return ('Я прыгнул на ' + [a] * 100 + ' сантиметров');
	}
	else if (typeof (a) === 'object' && typeof (b) === 'object') {
        return ('Я прошел ' + [] + 'шага');
    }
    
    else if (typeof (a) === 'object' && typeof (b) != 'object') {
        return 'Я прошёл ' + ' шагов';
        }		
};
