module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'xo',
		'plugin:import/recommended',
	],
	plugins: [
		'import',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'import/extensions': ['error', {
			js: 'always',
		}],
	},
};
