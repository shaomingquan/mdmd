var fs = require('fs');
var path = require('path');
var editTpl = fs.readFileSync(path.resolve(__dirname, '../views/edit.html')).toString();
var render = require('waterbear');

function edit (req, res) {
    var url = req.url;
    var filename = decodeURI(url.split('/')[2]);
    fs.readFile(process.cwd() + '/' + filename, function (err, content) {
        filecontent = err ? '# new markdown' : content.toString();
        res.end(render(editTpl, {
            filename: filename,
            filecontent: filecontent
        }));
    })

}

module.exports = edit;
