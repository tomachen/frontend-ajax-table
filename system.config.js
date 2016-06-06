System.config({
	defaultJSExtensions: false,
	transpiler: 'traceur',
	meta: {
		'*.json': {loader: 'json'},
		'*.css': {loader: 'css'},
		'*.html': {loader: 'text'},
		'*.jpg': {loader: 'image'},
		'*.jpeg': {loader: 'image'},
		'*.png': {loader: 'image'},
		'*.bmp': {loader: 'image'},
		'*.gif': {loader: 'image'},
		'*.webp': {loader: 'image'}
	},
	map: {
		'../../src/': 'source:',
		'../../': 'project:',
		'traceur': '../node_modules/bower-traceur/traceur.js'
	},
	paths: {
		'project:*': '../*',
		'source:*': '../src/*',
		//loader plugins
		'json': '../node_modules/systemjs-plugin-json/json.js',
		'css': '../node_modules/systemjs-plugin-css/json.js',
		'html': '../node_modules/systemjs-plugin-json/html.js',
		//modules
		'jquery': '../node_modules/jquery/dist/jquery.js'
	}
});
