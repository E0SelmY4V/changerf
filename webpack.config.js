module.exports = {
	entry: "./lib/index.js",
	// mode: "development",
	mode: "production",
	target: ['web', 'es3'],
	output: {
		path: __dirname + '/build',
	},
}