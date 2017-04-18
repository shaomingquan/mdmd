var tools = {};

tools.ajax = function (options, callback) {
    var url = options.url || '/op/';
    var method = options.method;
    var payload = options.data || '';

    var xhr = new XMLHttpRequest;
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback && callback(xhr.responseText);
        }
    }
    xhr.send(JSON.stringify(payload));
}

tools.ajaxFile = function (file, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload/', true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback && callback(xhr.responseText);
        }
    };
    xhr.send(file);

}
