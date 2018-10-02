
var main = {
    resolve: {
        extensions: ['.js','.jsx']
    },
	stats: 'errors-only',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	}
}

module.exports =[
	Object.assign({}, main,{
		output: {
			filename: 'js/index.js',
		},
		entry: [
			'./src/js/Index.jsx',
		]
    }),
	Object.assign({}, main,{
		output: {
			filename: 'js/gallery.js',
		},
		entry: [
			'./src/js/Gallery.jsx',
		]
	})
];
