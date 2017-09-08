/**
 * Created by hasee on 2017/8/13.
 */
const config = {
    pipe_space: {
        _comment:'管子垂直方向的间距',
        value: 150,
    },
    xGap: {
        _comment:'管子横向的间距',
        value: 150,
    },
}

var es = sel => document.querySelectorAll(sel)

var bindAll = function (sel, eventName, callback) {
    var l = es(sel)
    for (var i = 0; i < l.length; i++) {
        var input = l[i]
        input.addEventListener(eventName, function (event) {
            callback(event)
        })
    }
}

var templateControl = function (key, item) {
    var t = `
                    <div >
                        <label>
                            <input class="gua-auto-slider" type="range" value="${item.value}"
                            max="300"
                              data-value="config.${key}">
                            ${item._comment}: <span class="gua-label"></span>
                        </label>
                    </div>
                   `
    return t
}

var bindEvents = function () {
    bindAll('.gua-auto-slider', 'input', function (event) {
        var target = event.target
        var bindVar = target.dataset.value
        var v = target.value
        eval(bindVar + '.value =' + v)
        var label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}

var insertControls = function () {
    var div = e('.gua-controls')
    var keys = Object.keys(config)
    for (var k of keys) {
        var item = config[k]
        var html = templateControl(k, item)
        div.insertAdjacentHTML('beforeend', html)
    }
    log('insert Controls')
}

var _main = function () {
    //从配置文件里生成html控件
    insertControls()
    bindEvents()
    //绑定事件
}
_main()
