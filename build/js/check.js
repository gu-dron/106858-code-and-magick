function getMessage(a,b) {
	if (typeof a === 'boolean') {
		if(a === true) {
		return alert ('Я попал в' + [b]);	
		}
		else {
			return alert ('Я никуда не попал');
		}
	}
	else if (typeof a === 'number') {
		return alert ('Я прыгнул на ' + [a] * 100 + ' сантиметров');
	}
	else if (typeof a === 'object') {
		return alert ('Я прошёл ' + [] + 'шагов');
	}		
};
