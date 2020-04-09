const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    module: {
        rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            ],
        },
        {
            test: /\.(png|svg|jpg|gif|glb|hdr)$/,
            use: [{
                loader: 'file-loader'
            }]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader",
                }
            ]
        }, 
        ],
    },
    resolve: {
        alias: {
            'three/OrbitControls': path.join(__dirname, 'node_modules/three/examples/js/controls/OrbitControls.js'),
            'three/OBJLoader': path.join(__dirname, 'node_modules/three/examples/js/loaders/GLTFLoader.js'),
            'three/RGBELoader': path.join(__dirname, 'node_modules/three/examples/js/loaders/RoughnessMipmapper.js')
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            template: './src/index.html',
            filename: './index.html'
        }),
        new webpack.ProvidePlugin({
            'THREE': 'three'
        }),
   ]
};
