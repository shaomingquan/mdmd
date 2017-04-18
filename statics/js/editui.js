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
        var markdown = myCodeMirror.getValue();
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
                    content: myCodeMirror.getValue()
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
            window.history.replaceState({}, newTitle, '/edit/' + newTitle);
        })
    }

    function pasteHandler (e) {
        var cd = e.clipboardData.items[0];
        if (cd.type.indexOf('image') > -1) {
            tools.ajaxFile(cd.getAsFile(), function (res) {
                console.log(res);
            })
        }
    }

    function initCoder () {
        window.myCodeMirror = CodeMirror(writing, {
            value: document.getElementById('writingTmp').innerText,
            mode: "markdown"
        });
    }

    writing.addEventListener('keydown', function(e){
        if(e.keyCode == 9){
            e.preventDefault();
            var indent = '    ';
            var start = this.selectionStart;
            var end = this.selectionEnd;
            var selected = window.getSelection().toString();
            selected = indent + selected.replace(/\n/g,'\n'+indent);
            this.value = this.value.substring(0,start) + selected + this.value.substring(end);
            this.setSelectionRange(start+indent.length,start+selected.length);
        }
    });
    writing.addEventListener('input', throttle(renderPreview, 200));
    writing.addEventListener('input', throttle(save, 3000));
    writing.addEventListener('paste', pasteHandler);
    title.addEventListener('input', throttle(updateName, 1000));

    initCoder();
    renderPreview();

} (window))
