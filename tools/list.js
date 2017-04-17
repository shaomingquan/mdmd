var fs = require('fs');
var path = require('path');
var listTpl = fs.readFileSync(path.resolve(__dirname, '../views/list.html')).toString();
var render = require('waterbear');

function listFiles (req, res) {
    var cwd = process.cwd();
    fs.readdir(cwd, function (err, files) {
        var mkdowns = [];
        files.forEach(function (file) {
            if(file.indexOf('.md') > -1 || file.indexOf('.markdown') > -1) {
                // this is a markdown file
                mkdowns.push(file);
            }
        });

        res.end(render(listTpl, {
            files: files
        }));
    });
}

module.exports = listFiles;
