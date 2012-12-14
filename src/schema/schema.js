// schema.js

var fs = require('fs');

// load complete schema library
var Schema = {};

var files = fs.readdirSync(__dirname);
var file;

for(var i=0, len=files.length;i<len;i++) {
    file = files[i];
    if(file === 'schema.js') continue;

    Schema[file.split('.')[0]] = require(__dirname + '/' + file);
}

exports.Schema = Schema;