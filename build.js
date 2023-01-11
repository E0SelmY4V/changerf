const child_process = require('child_process');
const fs = require('fs');
const lastGt = 1;
let gthc = 0;
new Promise((res, rej) => {
	child_process.exec('webpack', (err, stdout, stderr) => {
		if (err) rej(err);
		console.log(stdout);
		console.log(stderr);
		const file = fs.readFileSync(__dirname + '/build/temp.js').toString();
		const k = file.split('exports}');
		const n = k[k.length - 1][0]
		const d = file.split('}()');
		const data = d.slice(0, -1).join('}()')
			+ `;typeof module==='undefined'?window.ChangeRF=${n}:module.exports=${n}}()`
			+ d[d.length - 1]
		fs.writeFileSync(__dirname + '/build/main.js', data)
		res();
	});
}).then(() => new Promise((res, rej) => {
	fs.unlink(__dirname + '/build/temp.js', (err) => err ? rej(err) : res());
}));