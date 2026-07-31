import webConfig from './apps/web/eslint.config.mjs';

export default [
	...webConfig,
	{
		files: ['apps/api/**/*.ts'],
		rules: {
			// сюда позже добавишь правила специально под Express/Node
		},
	},
];