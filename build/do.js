const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const out = fs.createWriteStream(__dirname + '/main.js');
function merge(list, cb) {
	list.length
		? fs.createReadStream(list.pop()).on('end', () => merge(list, cb)).pipe(out, { end: false })
		: (out.end(), cb());
}
child_process.exec(`webpack -c ${path.join(__dirname, '../webpack.config.js')}`, (err, stdout, stderr) => {
	if (err) throw err;
	console.log(stdout);
	console.log(stderr);
	merge(['tail', 'temp.js', 'head'].map(e => __dirname + '/' + e), () => {
		fs.unlink(__dirname + '/temp.js', (err) => { if (err) throw err; });
	});
});