var fs = require('fs');

function generateImageName () {
    return (Date.now() - Date.now() % 1000) / 1000 +
            String.fromCharCode(97 + parseInt(Math.random() * 26)) +
            String.fromCharCode(97 + parseInt(Math.random() * 26));
}

function upload (req, res) {
    var filename = generateImageName();
    var dirpath = process.cwd() + '/images/'
    var filepath = dirpath + filename + '.png';
    fs.exists(dirpath, function (result) {
        if(result) {
            writeImg();
        } else {
            fs.mkdir(dirpath, function () {
                console.log('mkdir');
                writeImg();
            });
        }
    })

    function writeImg () {
        var stream = fs.createWriteStream(filepath);
        try {
            req.pipe(stream);
            res.end(JSON.stringify({
                state: 'ok',
                filepath: '/images/' + filename + '.png'
            }));
        } catch (e) {
            res.end(JSON.stringify({
                state: 'failed'
            }));
        }
    }
}

module.exports = upload;
