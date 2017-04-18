var fs = require('fs');

function generateImageName () {
    return (Date.now() - Date.now() % 1000) / 1000 +
            String.fromCharCode(97 + parseInt(Math.random() * 26)) +
            String.fromCharCode(97 + parseInt(Math.random() * 26));
}

function upload (req, res) {
    req.on('data', function (data) {
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
            fs.writeFile(filepath, data, function (err) {
                if(err) {
                    res.end(JSON.stringify({
                        state: 'failed'
                    }));
                } else {
                    res.end(JSON.stringify({
                        state: 'ok',
                        filepath: '/images/' + filename + '.png'
                    }));
                }
            });
        }
    });
}

module.exports = upload;
