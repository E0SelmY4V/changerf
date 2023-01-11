require('jexpt')(
	typeof window !== 'undefined' ? window.ChangeRF = {} : exports,
	{
		BaseClass: require('./BaseClass'),
		CurveParams: require('./CurveParams')
	},
	require('./crf'),
	require('./rand')
);