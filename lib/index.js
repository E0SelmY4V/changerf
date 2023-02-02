/// <reference path="./exp.d.ts" />

var out = require('jexpt')(
	{
		BaseClass: require('./BaseClass'),
		CurveParams: require('./CurveParams')
	},
	require('./crf'),
	require('./rand')
);
exp === false
	? window.ChangeRF = out
	: exp.exports = out.ChangeRF = out[['de', 'fault'].join('')] = out;