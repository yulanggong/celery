var UglifyJS = require('uglify-js');
var fs = require('fs');
var pkg = require('./package.json');

var source = UglifyJS.minify('./celery.js', {
  output: {
    quote_style: 1
  }
}).code;

var html = fs.readFileSync('./index.html').toString();

html = html.replace(/javascript:([^"])+"/, 'javascript:' + source + '"');
html = html.replace(/version">[^<]+/, 'version">v'+pkg.version);

fs.writeFileSync('./index.html', html);