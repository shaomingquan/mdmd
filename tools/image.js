var fs = require('fs');

function staticImage (req, res) {
    var imgStream = fs.createReadStream(process.cwd() + req.url);
    imgStream.pipe(res);
    imgStream.on('error', function (err) {
        res.end('no image');
    });
}

module.exports = staticImage;
