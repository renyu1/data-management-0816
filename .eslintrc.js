module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': `off`,
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-side-effects-in-computed-properties': false,
        'vue/return-in-computed-property': false

    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}

