/** @type {import('@volar-plugins/prettier')} */
const { volarPrettierPlugin } = require('@volar-plugins/prettier');
const prettyhtml = require('@volar-plugins/prettyhtml');

module.exports = {
	plugins: [
		volarPrettierPlugin({
			languages: ['html', 'css', 'scss', 'typescript', 'javascript'],
			html: {
				breakContentsFromTags: true,
			},
			useVscodeIndentation: true,
		}),
		prettyhtml({ printWidth: 89 }),
	],
};
