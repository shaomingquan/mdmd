;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.waterbear = factory()
})(this, function () {

    var render = function (tpl, data) {
        var vars = Object.keys(data);
        var varEvalList = '';
        for(var i = 0; i < vars.length ;i++) {
            varEvalList += `var ${vars[i]} = ${JSON.stringify(data[vars[i]])};`;
        }
        var output = ''; // may be uglify bug
        var code = '';
        var index = 0;
        while(true) {
            index = tpl.indexOf('<%');
            if(index === -1) {
                code += `output += \`${tpl}\`;`;
                break;
            }
            code += `output += \`${tpl.substring(0, index)}\`;`;
            tpl = tpl.substring(index);
            index = tpl.indexOf('%>');
            if(tpl[2] === '-') {
                code += `output += ${tpl.substring(3, index)};`;
            } else {
                code += tpl.substring(2, index) + '\n';
            }
            tpl = tpl.substring(index + 2);
        }
        try {
            eval(varEvalList + code);
        } catch (e) { console.error(e); }
        return output;
    };
    return render;

});
