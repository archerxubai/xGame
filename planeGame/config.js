/**
 * Created by hasee on 2017/8/13.
 */
var config = {
    player_speed: {
        _comment:'玩家速度',
        value: 10,
    },
    enemy_speed:  {
        _comment:'敌人速度',
        value: 1,
    },
    enemy_bullet_speed:  {
        _comment:'敌人子弹速度',
        value: 10,
    },
    coolDown:  {
        _comment:'玩家开火冷却',
        value: 4,
    },
    player_bullet_speed: {
        _comment:'玩家子弹速度',
        value: 4,
    },
    enemy_fire_cooldown_min: {
        _comment: '敌人开火冷却下限',
        value: 50,
    },
    enemy_fire_cooldown_max: {
        _comment: '敌人开火冷却上限',
        value: 200,
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
