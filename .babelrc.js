const { resolvePath } = require('babel-plugin-module-resolver');

module.exports = {
    presets: [
        '@babel/preset-react'
    ],
    plugins: [
        'babel-plugin-module-resolver'
    ]
}