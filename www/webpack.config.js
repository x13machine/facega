var main = {
    stats: 'errors-only',
    mode: 'development',
    module: {
        rules: [
            {
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
            './src/js/index.jsx',
        ]
    })
];
