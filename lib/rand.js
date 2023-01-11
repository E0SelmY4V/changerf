function randL(min, fmax) {
	return Math.floor(Math.random() * (fmax - min)) + min;
}

function randCZ(min, max) {
	return randL(min, max + 1);
}

var g1;
function deDot(s) {
	(g1 = s.indexOf('.') + 1) && (g1 = s.length - g1);
	(s = s.split('')).splice(-g1 - 1, g1 !== 0);
	return parseInt(s.join(''));
}
function randCR(min, max) {
	var g0, f, i, k;
	min = deDot(String(min)), g0 = g1;
	max = deDot(String(max)), f = g1 > g0 ? g1 : g0;
	f > randCR.minDigit || (f = randCR.minDigit);
	for (i = f - g0; i > 0; --i) min *= 10;
	for (i = f - g1; i > 0; --i) max *= 10;
	return (k = String(randCZ(min, max)).split('')).splice(-f, 0, '.'), parseFloat(k.join(''));
}
randCR.minDigit = 6;

module.exports = { randL: randL, randCZ: randCZ, randCR: randCR };
