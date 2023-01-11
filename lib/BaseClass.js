function BaseClass(n) {
	for (var i in n) this[i] = n[i];
	this.proto = this;
}
BaseClass.prototype = {
	parser: {},
	attr: function (n, v) {
		return BaseClass.attr(this, n, v);
	},
	attrProto: function (n, v) {
		return BaseClass.attr(this.proto, n, v);
	}
};
BaseClass.prototype.proto = BaseClass.prototype;
BaseClass.attr = function (w, n, v) {
	if (typeof n === 'string') w[n] = n in w.parser ? w.parser[n](v) : v;
	else for (var i in n) w[i] = i in w.parser ? w.parser[i](n[i]) : n[i];
};

module.exports = BaseClass;
