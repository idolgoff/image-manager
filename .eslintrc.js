module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es2021': true,
        'jest/globals': true,
    },
    'extends': [
        'google',
        'plugin:jest/all',
    ],
    'parserOptions': {
        'ecmaVersion': 12,
    },
    'plugins': ['jest'],
    'rules': {
        'indent': ['error', 4],
        'max-len': ['error', {'code': 120}],
        'no-undef': 'error',
    },
};
