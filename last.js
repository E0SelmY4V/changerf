/*
	下方这些全局变量是函数默认的生成参数，对于生成时没有额外提供的参数，将会使用这些变量的值。
	若希望大规模的改变参数，可以尝试在网页的脚本中更改以下全局变量，作为函数默认的生成参数。
*/
change_n_type = 0;	  //函数类型
change_n_slope = 2.0;   //曲线最大/最小斜率
change_n_multi = 1.0;   //曲线减速倍数
change_n_maxn = 2.6;	//曲线最大变形程度
change_n_minn = 1.8;	//曲线最小变形程度
change_n_round = false;	 //是否对结果四舍五入
change_n_tctrl = false;	 //是否为了使数组长度相近而拉伸图形
/**
 * 生成一个平滑的函数
 * @param {number} l 移动的距离
 * @param {object} p 生成参数。若有为空的参数则使用默认值
 * @param {0|1|2|3} p.type 曲线种类。0~3分别对应随机、多次函数、椭圆函数、三角函数
 * @param {number} p.slope 曲线最大/最小斜率
 * @param {number} p.multi 曲线减速倍数
 * @param {number} p.maxn 曲线最大变形程度
 * @param {number} p.minn 曲线最小变形程度
 * @param {boolean} p.round 是否对结果四舍五入
 * @param {boolean} p.tctrl 是否为了使数组长度相近而拉伸图形
 * @returns {array} x为整数时函数取到的y值
*/
function change_rf(l, p) {
	var s = parseFloat(l), xz, i, m, minn, maxn, ifr, ctr, seta = change_fgp(p), x = -1, bz = [];
	xz = seta.type;
	i = seta.slope;
	m = seta.multi;
	minn = seta.minn;
	maxn = seta.maxn;
	ifr = seta.round;
	ctr = seta.tctrl;
	if (xz == 0) xz = 1 + Math.floor(Math.random() * 3);
	if (s < 0) i = - i;
	else if (s == 0) return [0];
	switch (xz) {
		case 1:
			var n = change_frand(minn, maxn), t = change_frand(s * n / i, s * n * i), l = t * m, k = (Math.pow(2, n - 1) * s) / Math.pow(l, n);
			while (++x < l / 2) bz[x] = k * Math.pow(x, n);
			while (++x < l) bz[x] = (0 - k) * Math.pow(Math.abs(x - l), n) + s;
			break;
		case 2:
			m *= ctr ? 0.89 : 1;
			var t = change_frand(s / i + Math.abs(s) * Math.sqrt(1 / (i * i) + 1), s * i + Math.abs(s) * Math.sqrt(i * i + 1)), k1 = (s * s + t * t) / (4 * s), k2 = s - k1, r = m * m * k1 * k1, l = t * m;
			while (++x < l / 2) bz[x] = k1 - ((s > 0 ? 1 : -1) * (Math.sqrt(r - x * x) / m));
			while (++x < l) bz[x] = (s > 0 ? 1 : -1) * (Math.sqrt(r - Math.pow((x - l), 2)) / m) + k2;
			break;
		case 3:
			m *= ctr ? 1.4 : 1;
			var t = change_frand(Math.PI * s / 2 / i, Math.PI * s * i / 2), l = t * m, k1 = s / 2, k2 = Math.PI / l;
			while (++x < l) bz[x] = -k1 * Math.cos(k2 * x) + k1;
			break;
	}
	if (ifr) for (i = 0; i < bz.length; i++) bz[i] = Math.round(bz[i]);
	bz[0] = 0;
	bz[x] = s;
	return bz;
}
/*
函数change_fgp()：
	功能简介：
		生成一个标准的可以用来当成函数生成参数的对象（object）。
	参数：
		可选。一个对象（object），表示未处理的生成参数。
	返回值：
		一个对象（object），就是标准的函数生成参数。
*/
function change_fgp() {
	if (typeof arguments[0] != "undefined") {
		var seta = arguments[0];
		return {
			type: typeof seta.type == "undefined" ? change_n_type : parseInt(seta.type),
			slope: typeof seta.slope != "undefined" ? parseFloat(seta.slope) : change_n_slope,
			multi: typeof seta.multi != "undefined" ? parseFloat(seta.multi) : change_n_multi,
			minn: typeof seta.minn == "undefined" ? change_n_minn : seta.minn,
			maxn: typeof seta.maxn == "undefined" ? change_n_maxn : seta.maxn,
			round: typeof seta.round != "undefined" ? seta.round : change_n_round,
			tctrl: typeof seta.tctrl != "undefined" ? seta.tctrl : change_n_tctrl
		}
	} else {
		return {
			type: change_n_type,
			slope: change_n_slope,
			multi: change_n_multi,
			minn: change_n_minn,
			maxn: change_n_maxn,
			round: change_n_round,
			tctrl: change_n_tctrl
		}
	}
}
/*
函数change_tf()：
	功能简介：
		更简单，更优雅地生成一个平滑的函数。
	参数：
		1.必需。一个实数（float），表示函数起始的位置。
		2.必需。一个实数（float），表示函数结束的位置。
		3.可选。一个对象（object），表示生成参数。
	返回值：
		一个数组。就是x为整数时函数取到的y值。
*/
function change_tf() {
	var r = typeof arguments[2] == "undefined" ? 0 : arguments[2].round, sz = [0], n = r ? Math.round(arguments[0]) : arguments[0], s = r ? Math.round(arguments[1]) : arguments[1];
	sz = change_rf(s - n, typeof arguments[2] == "undefined" ? {} : arguments[2]);
	for (var i = 0; i < sz.length; i++) sz[i] += n;
	return sz;
}
/*
	下方这些全局变量是平滑变幻器（CrfChanger）默认的属性，对于声明时没有额外提供的属性，将会在声明时使用这些变量的值。
	若希望在声明前大规模的改变属性，可以尝试在网页的脚本中更改以下全局变量，作为平滑变幻器的默认属性。
*/
change_s_min = 0;	   //变幻器所能取到的最小值
change_s_max = 100;	 //变幻器所能取到的最大值
change_s_ifs = 50;	  //两次计算之间的时间间隔
change_s_iwr = 0;	   //越过最大值是否就能取到最小值
change_s_acv = "m-m";   //一次变幻所能移动的最大距离
change_s_icv = 0;	   //一次变幻所能移动的最小距离
change_s_nfr = 0;	   //是否对结果四舍五入
/*
函数CrfChanger()：
	功能简介：
		构造一个"CrfChanger"对象，也就是"平滑变幻器"对象。
		平滑变幻器的功能是不停地计算一个值不断平滑地变化的变量。
		你可以将其想象为一个不停变化的变量，通过"value"元素获取它的值。
		属性：
			"value"，表示当前计算的数值。
			"onrun"，表示是否已启动变幻。
			"min"，表示所能取到的最小值。
				默认为0。
			"max"，表示所能取到的最大值。
				默认为100。
			"ifs"，表示两次计算之间的时间间隔，单位为毫秒。
				默认为50。
			"iwr"，是“地球是否是圆的”的简称，表示越过最大值是否就能取到最小值。
				如果为1，最大值和最小值将重合，变幻器将不会取到最大值。
				默认为0。
			"acv"，表示一次变幻所能移动的最大距离。
				默认为"m-m"，就是(最大值-最小值)的意思。
			"icv"，表示一次变幻所能移动的最小距离。
				默认为0。
			"nfr"，表示是否对结果四舍五入。此属性影响函数生成的参数，也就是"fgp"属性中的"round"元素的值将会与此属性的值相同。
				默认为0。
			"fgp"，对象（object），表示函数生成的参数。
				默认为默认，上面写过了，这里就不说了。
		方法：
			"start()"，启动变幻。
			"stop()"，停止变幻。
			"reset()"，重置变幻器并停止变幻。
			"restart()"，重启变幻器。
			"iatt()"，导入属性。
				参数：
					可选，一个对象（object），表示导入的属性。
				返回值：
					一个对象（object），表示当前变幻器的属性。
			"oatt()"，导出属性。
				返回值：
					一个对象（object），表示当前变幻器的属性。
		使用例：
			//创建一个名为cc的平滑变幻器
			var cc = new CrfChanger({
				min:0,	  //最小值为0
				max:255,	//最大值为255
				ifs:20,	 //刷新间隔为20毫秒
				nfr:1,	  //要求对结果四舍五入
				fgp:{		   //函数生成参数
					slope:1.5   //设置最大/最小斜率为1.5
				}
			});

			//可以设置一些属性
			cc.iwr = 0;

			//启动cc的变幻
			cc.start();

			//不断输出cc当前的值
			setInterval(function() {
				document.body.innerText = cc.value;
			}, 20);

			//20秒之后停止变幻
			setTimeout(function() {
				cc.stop();
			}, 20000)
	参数：
		可选。一个对象（object），表示对象的一些属性。
			通过这个参数，您可以在声明平滑变幻器的时候初始化。
			可能会使您的代码看起来更加的简洁。
	返回值：
		无。
*/
function CrfChanger() {
	if (typeof CrfChanger.f == "undefined") {
		CrfChanger.prototype.f = {
			0: function (n) {
				if (n._c[2].length == 0) CrfChanger.prototype.f[1](n);
				var max = Math.max(n._c[4].max, n.max), min = Math.min(n._c[4].min, n.min)
				n.value = ((n.value = n._c[2].pop()) > max || n.value < min) ? (((n.value = (n.value - min) % (max - min)) < 0 ? max : min) + n.value) : ((n.iwr && n.value == max) ? min : n.value);
			},
			1: function (n) {
				n.fgp.round = n.nfr;
				if (n._c[4].max != n.max || n._c[4].min != n.min) n._c[3] = 1;
				if (n._c[3]) {
					if (n._c[3]++ == 3) {
						n._c[4].min = n.min;
						n._c[4].max = n.max;
						n._c[3] = 0;
					}
				}
				var mb, s, z, f, acv = n.acv == "m-m" ? n.max - n.min : n.acv, min = Math.max(n.min, n.value - acv), max = Math.min(n.value + acv, n.max), d = String(max - min - 2 * n.icv), mb = n._c[3] == 2 ? change_frand(n.min, n.max) : (n.iwr ? (n.value + (Math.floor(Math.random() * 2) * 2 - 1) * (n.icv + change_frand(0, acv - n.icv))) : ((f = (n.value + n.icv > n.max ? 1 : 0) + (n.value - n.icv < n.min ? 2 : 0)) ? ((--f) ? ((--f) ? change_frand(n.min, n.max) : change_frand(n.value + n.icv, max)) : change_frand(min, n.value - n.icv)) : (((z = Math.floor(Math.random() * ((d *= parseInt(Math.pow(10, (s = (s = String((s = d.match(/\..*/)) == null ? 0 : s).length - 1) > 5 ? s : 5)))) + 2))) == d + 1) ? n.value + n.icv : (((mb = z * Math.pow(10, -s) + n.min) > n.value - n.icv) ? mb += 2 * n.icv : mb))));
				n._c[2] = change_tf(mb, n.value, n.fgp);
			}
		};
		CrfChanger.prototype.start = function () {
			var n = this;
			if (!n.onrun) {
				if (typeof n._c[4].max == "undefined") n._c[4].max = n.max;
				if (typeof n._c[4].min == "undefined") n._c[4].min = n.min;
				if (typeof n.value == "undefined") {
					n.value = change_frand(n.min, n.max);
					n.f[1](n);
					var k = Math.floor(Math.random() * n._c[2].length);
					n._c[2].splice(-k, k);
					n.value = n._c[2].pop();
				}
				n.f[0](n);
				n._c[0] = setInterval(n.f[0], n.ifs, n);
				n.onrun = 1;
			}
			return 1;
		}
		Object.defineProperty(this, 'ifs', {
			get: function() {
				return this._c[1];
			},
			set: function(v) {
				this._c[1] = v;
				if(v != this._c[1] && typeof this._c[1] != "undefined") this.restart();
			}
		})
		CrfChanger.prototype.stop = function () {
			clearInterval(this._c[0]);
			this.onrun = 0;
			return 0;
		}
		CrfChanger.prototype.reset = function () {
			var n = this;
			n.stop();
			n._c[4] = {};
			n._c[3] = 0;
			n.onrun = 0;
			n._c[2] = [];
			n.value = undefined;
			return 0;
		}
		CrfChanger.prototype.restart = function () {
			this.stop();
			this.start();
			return 1;
		}
		CrfChanger.prototype.oatt = function () {
			var n = this;
			return {
				min: n.min,
				max: n.max,
				ifs: n.ifs,
				iwr: n.iwr,
				acv: n.acv,
				icv: n.icv,
				nfr: n.ifr,
				fgp: n.fgp
			};
		}
		CrfChanger.prototype.iatt = function () {
			var n = this;
			if (typeof arguments[0] != "undefined") {
				var s = arguments[0];
				if (typeof s.min != "undefined") n.min = parseFloat(s.min);
				if (typeof s.max != "undefined") n.max = parseFloat(s.max);
				if (typeof s.ifs != "undefined") n.ifs = parseFloat(s.ifs);
				if (typeof s.iwr != "undefined") n.iwr = s.iwr;
				if (typeof s.acv != "undefined") n.acv = s.acv;
				if (typeof s.icv != "undefined") n.icv = parseFloat(s.icv);
				if (typeof s.nfr != "undefined") n.nfr = s.nfr;
				if (typeof s.fgp != "undefined") n.fgp = change_fgp(s.fgp);
			}
			return n.oatt();
		}
	}
	var n = this;
	n.t = {};
	n._c = [];
	if (typeof arguments[0] == "undefined") {
		n.min = change_s_min;
		n.max = change_s_max;
		n.ifs = change_s_ifs;
		n.iwr = change_s_iwr;
		n.acv = change_s_acv;
		n.icv = change_s_icv;
		n.nfr = change_s_nfr;
		n.fgp = change_fgp();
	} else {
		var seta = arguments[0];
		n.min = typeof seta.min == "undefined" ? change_s_min : parseFloat(seta.min);
		n.max = typeof seta.max == "undefined" ? change_s_max : parseFloat(seta.max);
		n.ifs = typeof seta.ifs == "undefined" ? change_s_ifs : parseFloat(seta.ifs);
		n.iwr = typeof seta.iwr == "undefined" ? change_s_iwr : seta.iwr;
		n.acv = typeof seta.acv == "undefined" ? change_s_acv : seta.acv;
		n.icv = typeof seta.icv == "undefined" ? change_s_icv : parseFloat(seta.icv);
		n.nfr = typeof seta.nfr == "undefined" ? change_s_nfr : seta.nfr;
		n.fgp = change_fgp(seta.fgp);
	}
	n.reset();
}
/*
	下方这些全局变量是change_eec()在元素增加变色功能时默认使用的参数。
	若希望改变默认的参数，可以尝试在网页的脚本中更改以下全局变量。
*/
change_color_defaultIFS = 50;   //默认颜色刷新间隔
change_color_defaultColor = {
	//默认颜色变幻参数
	min: 0,	 //颜色所能取到的最小值
	max: 255,   //颜色所能取到的最大值
	ifs: 50,	//两次计算之间的时间间隔
	iwr: 0,	 //越过最大值是否就能取到最小值
	acv: "m-m", //一次变幻所能移动的最大距离
	icv: 0,	 //一次变幻所能移动的最小距离
	nfr: 1,	 //是否对结果四舍五入
	fgp: {
		//颜色变幻函数生成参数
		type: 0,	//函数类型
		slope: 1.2, //曲线最大/最小斜率
		multi: 1.0, //曲线减速倍数
		maxn: 2.6,  //曲线最大变形程度
		minn: 1.8,  //曲线最小变形程度
		tctrl: 0	//是否为了使数组长度相近而拉伸图形
	}
}
/*
函数change_eec()：
	功能简介：
		是enableElementChange的简称，可以给HTML元素增加背景平滑变色功能。
		可以给HTML元素增加一个名称叫"crfColor"的类型为平滑变色操作器（CrfCSys）的对象（object）的属性，通过操作这个对象来控制元素的变色。
		名称叫"crfColor"的平滑变色操作器对象：
			属性：
				"onrun"，表示是否已启动平滑变色。
				"ifs"，表示颜色刷新间隔。
					默认为50。
				"changer"，储存三个平滑变幻器对象，依次代表Red、Green、Blue的值。
					平滑变幻器对象的各种属性详见上方CrfChanger函数的简介。
					如何操作平滑变幻器对象也请参见上方CrfChanger函数的简介。
					平滑变幻器对象的各种属性默认与全局变量change_color_defaultColor的各种属性相同。
			方法：
				"start()"，启动平滑变色。
				"stop()"，停止平滑变色。
				"reset()"，重置操作器并停止平滑变色。
				"restart()"，重启操作器。
		使用例：
			&lt;!DOCTYPE html&gt;
			&lt;html&gt;
			&lt;head&gt;
				&lt;meta charset="UTF-8"&gt;
				&lt;!--加载crf库--&gt;
				&lt;script src="http://js.seventop.top/?crf.js"&gt;&lt;/script&gt;
			&lt;/head&gt;
			&lt;body&gt;
				&lt;!--来两个元素--&gt;
				&lt;p id="p1"&gt;呵呵呵呵&lt;/p&gt;
				&lt;p id="p2"&gt;呵呵&lt;/p&gt;
				&lt;script&gt;
					//给body和两个p标签添加平滑变色功能
					change_eec(document.body, p1, p2);

					//开启他们的变色
					change_ccstart(document.body, p1, p2);
				&lt;/script&gt;
			&lt;/body&gt;
			&lt;/html&gt;
		参数：
			数量可变。HTML元素（object），表示要启用变色功能的元素。
		返回值：
			没毛病的话返回0。
*/
function change_eec() {
	var n = arguments, j;
	for (j = 0; j < n.length; j++) {
		if (typeof n[j].crfColor == "undefined") {
			n[j].crfColor = new CrfCSys;
			n[j].crfColor.element = n[j];
		}
	}
	return 0;
}
/*
函数CrfCSys()：
	功能简介：
		构造一个CrfCSys对象，也就是"平滑变色操作器"。
		和change_eec()搭配使用。
	参数：
		无。
	返回值：
		无。
*/
function CrfCSys() {
	if (typeof CrfCSys.prototype.tick == "undefined") {
		CrfCSys.prototype.tick = function (n) {
			if (n.ifs != n._c[0]) n.restart();
			var a = n.changer;
			n.element.style.background = "rgb(" + [a[0].value, a[1].value, a[2].value] + ")";
		}
		CrfCSys.prototype.reset = function () {
			var n = this;
			n._c = [];
			n.ifs = change_color_defaultIFS;
			n._c[0] = n.ifs;
			n.changer = [];
			for (var i = 0; i < 3; i++) n.changer[i] = new CrfChanger(change_color_defaultColor);
			n.stop();
			n.onrun = 0;
			return 0;
		}
		CrfCSys.prototype.start = function () {
			var n = this;
			if (!n.onrun) {
				n._c[0] = n.ifs;
				n.tick(n);
				for (var i = 0; i < 3; i++) n.changer[i].start();
				n._c[1] = setInterval(n.tick, n._c[0], n);
				n.onrun = 1;
			}
			return 1;
		}
		CrfCSys.prototype.stop = function () {
			clearInterval(this._c[1]);
			for (var i = 0; i < 3; i++) this.changer[i].stop();
			this.onrun = 0;
			return 0;
		}
		CrfCSys.prototype.restart = function () {
			this.stop();
			this.start();
			return 1;
		}
	}
	this.reset();
}
/*
	下方这些全局变量是change_eeg()在元素增加变色功能时默认使用的参数。
	若希望改变默认的参数，可以尝试在网页的脚本中更改以下全局变量。
*/
change_defaultGraColor = {
	ifs: 50,	//默认颜色刷新间隔
	non: 2,	 //默认颜色节点数量
	color_weight_changer: {
		//默认纯色区权重变幻参数
		min: 0,	 //权重所能取到的最小值
		max: 50,   //权重所能取到的最大值
		ifs: 50,	//两次计算之间的时间间隔
		iwr: 0,	 //越过最大值是否就能取到最小值
		acv: "m-m", //一次变幻所能移动的最大距离
		icv: 0,	 //一次变幻所能移动的最小距离
		nfr: 0,	 //是否对结果四舍五入
		fgp: {
			//权重变幻函数生成参数
			type: 0,	//函数类型
			slope: 1.2, //曲线最大/最小斜率
			multi: 1.0, //曲线减速倍数
			maxn: 2.6,  //曲线最大变形程度
			minn: 1.8,  //曲线最小变形程度
			tctrl: 0	//是否为了使数组长度相近而拉伸图形
		}
	},
	transition_weight_changer: {
		//默认过渡区权重变幻参数
		min: 200,   //权重所能取到的最小值
		max: 400,   //权重所能取到的最大值
		ifs: 50,	//两次计算之间的时间间隔
		iwr: 0,	 //越过最大值是否就能取到最小值
		acv: "m-m", //一次变幻所能移动的最大距离
		icv: 0,	 //一次变幻所能移动的最小距离
		nfr: 0,	 //是否对结果四舍五入
		fgp: {
			//权重变幻函数生成参数
			type: 0,	//函数类型
			slope: 1.2, //曲线最大/最小斜率
			multi: 1.0, //曲线减速倍数
			maxn: 2.6,  //曲线最大变形程度
			minn: 1.8,  //曲线最小变形程度
			tctrl: 0	//是否为了使数组长度相近而拉伸图形
		}
	},
	axis_changer: {
		//默认对称轴变幻参数
		min: -180,  //对称轴旋转参数所能取到的最小值
		max: 180,   //对称轴旋转参数所能取到的最大值
		ifs: 50,	//两次计算之间的时间间隔
		iwr: 1,	 //越过最大值是否就能取到最小值
		acv: 270,   //一次变幻所能旋转的最大角度
		icv: 90,	//一次变幻所能旋转的最小角度
		nfr: 0,	 //是否对结果四舍五入
		fgp: {
			//对称轴旋转函数生成参数
			type: 0,	//函数类型
			slope: 1.2, //曲线最大/最小斜率
			multi: 2.0, //曲线减速倍数
			maxn: 2.6,  //曲线最大变形程度
			minn: 1.8,  //曲线最小变形程度
			tctrl: 0	//是否为了使数组长度相近而拉伸图形
		}
	},
	color_changer: {
		//默认颜色变幻参数
		min: 0,	 //颜色所能取到的最小值
		max: 255,   //颜色所能取到的最大值
		ifs: 50,	//两次计算之间的时间间隔
		iwr: 0,	 //越过最大值是否就能取到最小值
		acv: "m-m", //一次变幻所能移动的最大距离
		icv: 0,	 //一次变幻所能移动的最小距离
		nfr: 1,	 //是否对结果四舍五入
		fgp: {
			//颜色变幻函数生成参数
			type: 0,	//函数类型
			slope: 1.2, //曲线最大/最小斜率
			multi: 1.0, //曲线减速倍数
			maxn: 2.6,  //曲线最大变形程度
			minn: 1.8,  //曲线最小变形程度
			tctrl: 0	//是否为了使数组长度相近而拉伸图形
		}
	}
}
/*
函数change_eeg()：
	功能简介：
		是enableElementGraduallyChange的简称，可以给HTML元素增加背景平滑渐变色功能。
		可以给HTML元素增加一个名称叫"crfColor"的类型为平滑渐变色操作器（CrfGSys）的对象（object）的属性，通过操作这个对象来控制元素的渐变色。
		名称叫"crfColor"的平滑渐变色操作器对象：
			属性：
				"onrun"，表示是否已启动平滑渐变色。
				"ifs"，表示颜色刷新间隔。
					默认为50。
				"changer"，是一个对象，第一个元素储存的是对称轴平滑变幻器对象，剩下的代表渐变色的颜色节点，也就是说changer[i]就代表第i个颜色节点。
					除了第一个元素以外每个元素都储存五个平滑变幻器对象，依次代表对应节点的Red的值、Green的值、Blue的值、纯色权重和过渡权重五个变量。
					平滑变幻器对象的各种属性详见上方CrfChanger函数的简介。
					如何操作平滑变幻器对象也请参见上方CrfChanger函数的简介。
					平滑变幻器对象的各种属性默认从全局变量change_defaultGraColor中获取。
			方法：
				"start()"，启动平滑渐变色。
				"stop()"，停止平滑渐变色。
				"reset()"，重置操作器并停止平滑渐变色。
				"restart()"，重启操作器。
		使用例：
			&lt;!DOCTYPE html&gt;
			&lt;html&gt;
			&lt;head&gt;
				&lt;meta charset="UTF-8"&gt;
				&lt;!--加载crf库--&gt;
				&lt;script src="http://js.seventop.top/?crf.js"&gt;&lt;/script&gt;
			&lt;/head&gt;
			&lt;body&gt;
				&lt;!--来两个元素--&gt;
				&lt;p id="p1"&gt;呵呵呵呵&lt;/p&gt;
				&lt;p id="p2"&gt;呵呵&lt;/p&gt;
				&lt;script&gt;
					//给body和两个p标签添加平滑渐变色功能
					change_eec(document.body, p1, p2);

					//开启他们的渐变色
					change_ccstart(document.body, p1, p2);
				&lt;/script&gt;
			&lt;/body&gt;
			&lt;/html&gt;
		参数：
			数量可变。HTML元素（object），表示要启用渐变色功能的元素。
		返回值：
			没毛病的话返回0。
*/
function change_eeg() {
	var n = arguments, j;
	for (j = 0; j < n.length; j++) {
		if (typeof n[j].crfColor == "undefined") {
			n[j].crfColor = new CrfGSys;
			n[j].crfColor.element = n[j];
		}
	}
	return 0;
}
/*
函数CrfGSys()：
	功能简介：
		构造一个CrfGSys对象，也就是"平滑渐变色操作器"。
		和change_eeg()搭配使用。
	参数：
		无。
	返回值：
		无。
*/
function CrfGSys() {
	if (typeof CrfGSys.prototype.tick == "undefined") {
		CrfGSys.prototype.tick = function (n) {
			if (n.ifs != n._c[0]) n.restart();
			var a = n.changer, s = "", i, j, t = 0, l = (l = (l = n.changer[0].value % 90) < 0 ? 90 + l : l) < 45 ? 90 - l : l, q = Math.sqrt(2) * Math.sin(l * Math.PI / 180), z = (1 - q) / 2 / q;
			for (i = 1; i <= n.non; i++) {
				if (typeof n.changer[i] == "undefined") {
					n.changer[i] = [];
					for (j = 0; j < 3; j++) {
						n.changer[i][j] = new CrfChanger(change_defaultGraColor.color_changer);
						n.changer[i][j].start();
					}
					n.changer[i][3] = new CrfChanger(change_defaultGraColor.color_weight_changer);
					n.changer[i][3].start();
					n.changer[i][4] = new CrfChanger(change_defaultGraColor.transition_weight_changer);
					n.changer[i][4].start();
				}
				t += a[i][3].value + (i == n.non ? 0 : a[i][4].value);
			}
			t = 100 * q / t;
			for (i = n.non + 1; i < n.changer.length; i++) delete n.changer[i];
			for (i = 1; i <= n.non; i++) s += (", rgb(" + [a[i][0].value, a[i][1].value, a[i][2].value] + ") " + (z += a[i][3].value * t) + "%" + (i != n.non ? ", rgb(" + [a[i + 1][0].value, a[i + 1][1].value, a[i + 1][2].value] + ") " + (z += a[i][4].value * t) + "%" : ""));
			n.element.style.background = "linear-gradient(" + a[0].value + "deg" + s + ")"
		}
		CrfGSys.prototype.reset = function () {
			var n = this;
			n._c = [];
			n.ifs = change_defaultGraColor.ifs;
			n.non = change_defaultGraColor.non;
			n._c[0] = n.ifs;
			n.changer = [];
			n.changer[0] = new CrfChanger(change_defaultGraColor.axis_changer);
			for (var i = 1; i <= n.non; i++) {
				n.changer[i] = [];
				for (var j = 0; j < 3; j++) n.changer[i][j] = new CrfChanger(change_defaultGraColor.color_changer);
				n.changer[i][3] = new CrfChanger(change_defaultGraColor.color_weight_changer);
				n.changer[i][4] = new CrfChanger(change_defaultGraColor.transition_weight_changer);
			}
			n.stop();
			n.onrun = 0;
			return 0;
		}
		CrfGSys.prototype.start = function () {
			var n = this;
			if (!n.onrun) {
				n._c[0] = n.ifs;
				n.tick(n);
				n.changer[0].start();
				for (var i = 1; i <= n.non; i++) for (var j = 0; j < 5; j++) n.changer[i][j].start();
				n._c[1] = setInterval(n.tick, n._c[0], n);
				n.onrun = 1;
			}
			return 1;
		}
		CrfGSys.prototype.stop = function () {
			var n = this;
			clearInterval(n._c[1]);
			n.changer[0].stop();
			for (var i = 1; i <= n.non; i++) for (var j = 0; j < 5; j++) n.changer[i][j].stop();
			n.onrun = 0;
			return 0;
		}
		CrfGSys.prototype.restart = function () {
			this.stop();
			this.start();
			return 1;
		}
	}
	this.reset();
}
/*
函数change_ccstart()：
	功能简介：
		是color-change start的简称，可以开启元素的平滑变色和平滑渐变色功能。
		参数：
			数量可变。HTML元素（object），表示要启用变色功能的元素。
		返回值：
			没毛病的话返回1。
*/
function change_ccstart() {
	var n = arguments, j;
	for (j = 0; j < n.length; j++) {
		if (typeof n[j].crfColor != "undefined") {
			n[j].crfColor.start();
		}
	}
	return 1;
}
/*
函数change_ccstop()：
	功能简介：
		是color-change stop的简称，可以关闭元素的平滑变色和平滑渐变色功能。
		参数：
			数量可变。HTML元素（object），表示要关闭变色功能的元素。
		返回值：
			没毛病的话返回0。
*/
function change_ccstop() {
	var n = arguments, j;
	for (j = 0; j < n.length; j++) {
		if (typeof n[j].crfColor != "undefined") {
			n[j].crfColor.stop();
		}
	}
	return 0;
}
/*
函数change_frand()：
	功能简介：
		获取介于两个实数间的随机数。
	参数：
		1.必需。一个实数（float），表示最小值。
		2.必需。一个实数（float），表示最大值。
	返回值：
		一个实数（float），就是介于给的两个实数间的随机数。
*/
function change_frand(_x, _d) {
	var x = String(_x), d = String(_d), s = [0, 0], sf = 0, i;
	for (i = 0; i < x.length; i++) {
		if (sf) s[0]++;
		if (x[i] == '.') sf = 1;
	}
	sf = 0;
	for (i = 0; i < d.length; i++) {
		if (sf) s[1]++;
		if (d[i] == '.') sf = 1;
	}
	s = s[1] > s[0] ? s[1] : s[0];
	s = s > 5 ? s : 5;
	x = x * Math.pow(10, s);
	d = d * Math.pow(10, s);
	return Math.floor(Math.random() * (d - x + 1) + x) * Math.pow(10, -s);
}
/*
函数change_sjwz()：
	功能简介：
		获取各种类型的随机数。
	参数：
		1.必需。一个整数（int），表示类型。
			0为颜色。
			1为角度。
			2为权重。
		2.可选。一个实数（float），表示当前的角度，用来产生角度随机数。
		3.可选。一个实数（float），表示改变的角度最大圈数，用来产生角度随机数。
	返回值：
		一个数，就是产生的随机数。
*/
function change_sjwz() {
	switch (arguments[0]) {
		case 0:
			return Math.floor(Math.random() * 256);
		case 1:
			return arguments[1] + change_frand(-arguments[2] * 360, arguments[2] * 360);
		case 2:
			return change_frand(0, 100);
	}
}