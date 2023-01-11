var ChangeRF = {};
require('jexpt')(
	ChangeRF,
	{
		BaseClass: require('./BaseClass'),
		CurveParams: require('./CurveParams')
	},
	require('./crf'),
	require('./rand')
);
return ChangeRF;