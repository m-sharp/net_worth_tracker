const path = require("path");
const webpack = require("webpack");
module.exports = {
    // Build from
    entry: {
        main: path.resolve(__dirname, "src/index.js"),
    },
    // What to build
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        modules: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules"),
        ],
    },
    // Output build to
    output: {
        path: path.resolve(__dirname, "../net_worth_site/tracker/static/tracker/build/"),
        filename: "[name].js",
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ]
    },
};
