const {
	snake,
	exec,
	outFS,
	timeEnd,
	time,
	log,
	dels,
	cps,
	goodReg,
	comp,
} = require('lethal-build')(__dirname);

snake(
	dels('build'),
	cps(['lib', 'build']),
	dels(RegExp(`^${goodReg(comp('build'))}.*js`)),
	exec('npm exec webpack'),
	outFS([
		[1, '!function(exp){'],
		[0, 'build/temp.js'],
		[1, `}(typeof module!=='undefined'&&module)`],
	], 'build/main.js'),
	dels('build/temp.js'),
	timeEnd(),
	log('Built in', time(), 'ms')
);
