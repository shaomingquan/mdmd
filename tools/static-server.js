var fs = require('fs');
var path = require('path');

function ss (req, res) {
    var url = '..' + req.url;
    var rs = fs.createReadStream(path.resolve(__dirname, url));
    rs.pipe(res);
    rs.on('error', function (err) {
        res.writeHead(400);
        res.end('wrong file path');
    });
}

module.exports = ss;
