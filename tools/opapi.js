
var fs = require('fs');
var apis = {};
var exe = require('child_process').execFile

// create new file
apis.rename = function (data, s, f) {
    exe('mv', [data.oldname, data.newname], function (err, stdout) {
        err ? f() : s();
    })
}

// modify file
apis.modify = function (data, s, f) {
    var cwd = process.cwd();
    var filename = data.title;
    fs.writeFile(cwd + '/' + filename, data.content, function (err) {
        err ? f() : s();
    });
}

// delete file
apis.delete = function () {

}

module.exports = function (req, res) {
    var url = req.url;
    var temp = url.split('/');
    var opmethod = temp[1];

    req.on('data', function (buffer) {
        var body = JSON.parse(buffer.toString());
        var type = body.type;
        apis[type](body.data, success, failed);
    });

    function success () {
        res.end('1');
    }

    function failed () {
        res.end('0');
    }

}
