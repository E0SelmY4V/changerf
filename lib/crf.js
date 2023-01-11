var CurveParams = require('./CurveParams');
var rand = require('./rand');
var randCR = rand.randCR;
var randCZ = rand.randCZ;

function crf(l, params) {
	if (!(l = parseFloat(l))) return [0];
	params = CurveParams.parse(params);
	var s = l,
		xz = parseInt(params.type) || randCZ(1, 3),
		i = s < 0 ? -params.slope : params.slope,
		m = params.multi,
		x = 1,
		bz = [0];
	switch (xz) {
		case 1: {
			var n = randCR(params.minn, params.maxn),
				t = randCR(s * n / i, s * n * i),
				l = t * m,
				k = (Math.pow(2, n - 1) * s) / Math.pow(l, n);
			while (x < l / 2) bz.push(k * Math.pow(x, n)), x++;
			while (x < l) bz.push((0 - k) * Math.pow(Math.abs(x - l), n) + s), x++;
		} break;
		case 2: {
			m *= params.tctrl ? 0.89 : 1;
			var t = randCR(s / i + Math.abs(s) * Math.sqrt(1 / (i * i) + 1),
				s * i + Math.abs(s) * Math.sqrt(i * i + 1)),
				k1 = (s * s + t * t) / (4 * s),
				k2 = s - k1,
				r = m * m * k1 * k1,
				l = t * m;
			while (x < l / 2) bz.push(k1 - ((s > 0 ? 1 : -1) * (Math.sqrt(r - x * x) / m))), x++;
			while (x < l) bz.push((s > 0 ? 1 : -1) * (Math.sqrt(r - Math.pow((x - l), 2)) / m) + k2), x++;
		} break;
		case 3: {
			m *= params.tctrl ? 1.4 : 1;
			var t = randCR(Math.PI * s / 2 / i, Math.PI * s * i / 2),
				l = t * m,
				k1 = s / 2,
				k2 = Math.PI / l;
			while (x < l) bz[x] = -k1 * Math.cos(k2 * x) + k1, x++;
		} break;
	}
	if (params.round) for (i = x; i >= 0; --i) bz[i] = Math.round(bz[i]);
	bz[x] = s;
	return bz;
}

function ctf(from, to, params) {
	var params = CurveParams.parse(params), from = params.round ? Math.round(from) : from, rslt = crf(to - from, params), i;
	for (i = rslt.length - 1; i >= 0; --i) rslt[i] += from;
	return rslt;
}

module.exports = { crf: crf, ctf: ctf };
