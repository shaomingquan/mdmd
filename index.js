var http = require('http');

var staticServer = require('./tools/static-server');
var edit = require('./tools/edit');
var list = require('./tools/list');
var opapi = require('./tools/opapi');
var upload = require('./tools/upload');
var image = require('./tools/image');

module.exports = function (options) {

    var server = http.createServer(function (req, res) {

        var url = req.url;

        if(url.indexOf('/op/') > -1) {
            // delete or create or modify
            opapi(req, res);
        } else if(url.indexOf('/statics/') > -1) {
            // static resource
            staticServer(req, res);
        } else if (url.indexOf('/upload/') > -1) {
            // upload image
            upload(req, res);
        } else if (url.indexOf('/images/') > -1) {
            // image static server TODO
            image(req, res);
        } else if (url.indexOf('/list/') > -1) {
            // list of markdown files
            list(req, res);
        } else if (url.indexOf('/edit/') > -1) {
            //edit the specific file
            edit(req, res);
        } else {
            res.writeHead(302, {
                Location: '/list/'
            });
            res.end ();
        }

    });

    server.listen(options.port, function () {
        options.callback(options);
    });

}
