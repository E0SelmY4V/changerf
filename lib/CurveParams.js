var BaseClass = require('./BaseClass');

function CurveParams(n) {
	BaseClass.attr(this, n);
}
CurveParams.attr = function (n, v) {
	return CurveParams.prototype.attrProto(n, v);
};
CurveParams.parse = function (n) {
	return n && n.proto === CurveParams.prototype ? n : new CurveParams(n);
};
CurveParams.prototype = new BaseClass({
	type: 0,
	slope: 2.0,
	multi: 1.0,
	minn: 2.6,
	maxn: 1.8,
	round: false,
	tctrl: false,
	parser: {
		type: function (n) {
			switch (parseInt(n)) { case 1: case 2: case 3: return n; }
			return 0;
		},
		slope: parseFloat,
		multi: parseFloat,
		minn: parseFloat,
		maxn: parseFloat
	}
});

module.exports = CurveParams;
