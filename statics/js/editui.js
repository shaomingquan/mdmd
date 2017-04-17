(function (win) {

    function throttle (func, time) {
        var timer = null;
        return function () {
            if(timer) {
                return;
            }

            var context = this;
            var args = arguments;
            timer = setTimeout(function () {
                clearTimeout(timer);
                timer = null;
                func.apply(context, args);
            }, time)
        }
    }

    var title = document.getElementById('filename');
    var writing = document.getElementById('writing');
    var preview = document.getElementById('preview');
    var md = markdownit({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (__) {

                }
            }
            return '';
        }
    });

    function renderPreview () {
        var markdown = writing.innerText;
        preview.innerHTML = md.render(markdown);
    }

    function save () {
        console.info('save file!');
        tools.ajax({
            url: '/op/',
            method: 'post',
            data: {
                type: 'modify',
                data: {
                    title: title.innerText,
                    content: writing.innerText
                }
            }
        });
    }

    function updateName () {
        console.info('update filename');
        var newTitle = title.innerText;
        tools.ajax({
            url: '/op/',
            method: 'post',
            data: {
                type: 'rename',
                data: {
                    oldname: window.filename,
                    newname: newTitle,
                }
            }
        }, function () {
            window.filename =  newTitle;
        })
    }

    writing.addEventListener('input', throttle(renderPreview, 200));
    writing.addEventListener('input', throttle(save, 3000));
    title.addEventListener('input', throttle(updateName, 1000));

    renderPreview();

} (window))
