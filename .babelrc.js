const { resolvePath } = require('babel-plugin-module-resolver');

module.exports = {
    presets: [
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
            'babel-plugin-module-resolver',
            {
                alias: {
                    'react': './node_modules/react/umd/react.development.js',
                    'react-dom': './node_modules/react-dom/umd/react-dom.development.js'
                },
                // we replace as follows to make sure we stay in build dir
                resolvePath: (sourcePath, currentFile, opts) => resolvePath(sourcePath, currentFile, opts).replace('../../', '../')
            }
        ]
    ]
}