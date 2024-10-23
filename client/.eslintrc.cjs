module.exports = {
	settings: {
		react: {
			version: "detect"
		}
  	},
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
		tsconfigRootDir: __dirname
	},
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': [
		'warn',
		{ allowConstantExport: true },
		],
		"@typescript-eslint/no-explicit-any": ["warn"],//any 선언시 eslint 오류 off
		"@typescript-eslint/no-unsafe-assignment" : ["warn"],
		"@typescript-eslint/no-unused-vars" : ["off"]

	}
}
