

var apis = {};

// create new file
apis.newFile = function () {

}

// modify file
apis.modifyFile = function () {
    
}

// delete file
apis.deleteFile = function () {

}

module.exports = function (req, res) {
    var url = req.url;
    var temp = url.split('/');
    var opmethod = temp[1];
    // all use post
    // parse body
}
