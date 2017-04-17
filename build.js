var UglifyJS = require('uglify-js');
var fs = require('fs');

var html = fs.readFileSync('./index.html').toString();

var source = UglifyJS.minify('./celery.js', {
  output: { quote_style: 1 }
}).code;
html = html.replace(/javascript:([^"])+"/, 'javascript:'+ source +'"');
debugger

fs.writeFileSync('./index.html', html);