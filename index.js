var http = require('http');

var staticServer = require('./tools/static-server');
var edit = require('./tools/edit');
var list = require('./tools/list');

var server = http.createServer(function (req, res) {

    var path = req.url;
    console.log(path);

    if(path.indexOf('/statics/') > -1) {
        // static resource
        staticServer(req, res);
    } else if (path.indexOf('/list/') > -1) {
        // list of markdown files
        list(req, res);
    } else if (path.indexOf('/edit/') > -1) {
        //edit the specific file
        edit(req, res);
    } else {
        res.end ('hello');
    }

});

server.listen(3000);
