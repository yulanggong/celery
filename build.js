var UglifyJS = require('uglify-js');
var fs = require('fs');

var source = UglifyJS.minify('./celery.js', {
  output: { quote_style: 1 }
}).code;

var html = fs.readFileSync('./index.html').toString();
html = html.replace(/javascript:([^"])+"/, 'javascript:'+ source +'"');

fs.writeFileSync('./index.html', html);