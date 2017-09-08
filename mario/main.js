// var loadLevel = function(game, n) {
//     n = n - 1
//     var level = levels[n]
//     var blocks = []
//     for (var i = 0; i < level.length; i++) {
//         var p = level[i]
//         var b = Block(game, p)
//         blocks.push(b)
//     }
//     return blocks
// }

var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }

    r.send()
}

var __main = function () {
    var images = {
        bg: 'img/bg_day.png',
        title: 'img/title.png',
        game_over: 'img/game_over.png',
        // cloud: 'img/block',
        ground: 'img/land.png',
        b1: 'img/bird0_0.png',
        b2: 'img/bird0_1.png',
        b3: 'img/bird0_2.png',
        pipe_down: 'img/pipe_down.png',
        pipe_up: 'img/pipe_up.png',
        //number
        0: 'img/number/0.png',
        1: 'img/number/1.png',
        2: 'img/number/2.png',
        3: 'img/number/3.png',
        4: 'img/number/4.png',
        5: 'img/number/5.png',
        6: 'img/number/6.png',
        7: 'img/number/7.png',
        8: 'img/number/8.png',
        9: 'img/number/9.png',
    }

    let request = {
        url: 'mario.nes',
        callback(r){
            window.bytes = new Uint8Array(r)
            log('mario file', window.bytes.length)
            var game = GuaGame.instance(30, images, function (g) {
                var s = SceneTitle.new(g)
                g.runWithScene(s)
            })

            enableDebugMode(game, true)
            // log('bytes', bytes)
            // drawNes(bytes)
            // let step = 0
            // let bytesPerBlock = 16
            // let tilesPerSprite = 8
            // let bytesPerSprite = bytesPerBlock * tilesPerSprite
            // setInterval(function () {
            //     let offset = tileOffset + step * bytesPerSprite
            //     drawSprite(bytes.slice(offset))
            //     if(window.paused){
            //
            //     }else {
            //         step++
            //         step %= 4
            //     }
            // }, 200)
        },
    }
    ajax(request)


}

__main()
