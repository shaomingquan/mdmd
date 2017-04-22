// delete unrefed images

var fs = require('fs');
var cwd = process.cwd();
fs.readdir(cwd, function (err, files) {
    var refed = {};
    var pros = [];
    files.forEach(function (file) {
        if(file.indexOf('.md') > -1 || file.indexOf('.markdown') > -1) {
            // this is a markdown file

            pros.push(new Promise(function (res, rej) {

                fs.readFile(file, function (err, buffer) {
                    if(err) {
                        rej(false);
                    } else {
                        var str = buffer.toString();
                        var reg = /\((.+)\)/g;
                        var ret = null;
                        var img = null;
                        while(ret = reg.exec(str)) {
                            img = ret[1].trim();
                            if(img.indexOf('/images') === 0) {
                                // it is static image
                                refed[img] = 1;
                            }
                        }
                        res(true);
                    }
                })

            }))

        }
    });

    Promise.all(pros).then(function () {
        clearUnrefed(refed);
    });
});

function clearUnrefed (refed) {
    var imageDir = process.cwd() + '/images/';
    fs.readdir(imageDir, function (err, files) {
        if(err) {

        } else {
            files.forEach(function (file) {
                if(!refed['/images/' + file]) {
                    console.log('delete image : ' + file);
                    fs.unlink(imageDir + file);
                }
            })
        }
    });
}
