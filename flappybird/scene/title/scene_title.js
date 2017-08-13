class Pipes{
    constructor(game){
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.xGap = 200
        this.columsOfPipe = 3
        for (var i = 0; i < 3; i++){
            var p1 = GuaImage.new(game, 'pipe_up')
            p1.flipY = true
            p1.x = 500 + i * this.xGap
            var p2 = GuaImage.new(game, 'pipe_up')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    static  new(game){
        return new this(game)
    }

    resetPipesPosition(p1, p2){
        p1.y = randonBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    update(){
        for (var i = 0; i < this.pipes.length / 2; i += 2){
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100){
                p1.x += this.xGap * this.columsOfPipe
            }
            if (p2.x < -100){
                p2.x += this.xGap * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        // }
        // for (var p of this.pipes){
        //     p.x -= 5
        //     if (p.x < -100){
        //         p.x += this.xGap * this.columsOfPipe
        //         this.resetPipesPosition()
        //     }
        }
    }

    draw(){
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }

    debug(){
        this.xGap = config.xGap.value
        this.pipeSpace = config.pipe_space.value
    }
}

class Bird extends GuaAnimation{
    constructor(game){
        super(game)

    }

    static new(game){
        return new this(game)
    }

    update(){
        super.update()
        var b = this
        var objs = this.game.scene.elements
        for (let i = 0; i < objs.length; i++){
            let e = objs[i]
            // log('this is ', instanceof(e))
            if (e instanceof Pipes) {
                for (let p of e.pipes) {
                    log('it is pipe', p, p.x, p.y, p.w)
                    log(this.collide(p))
                    if (this.collide(p)) {
                        log('collide')
                        var s = SceneEnd.new(this.game)
                        b.game.replaceScene(s)
                    }
                }

            }
        }
    }

    collide(target) {
        var aInb = function (x, x1, x2) {
            return x >= x1 && x <= x2
        }
        var a = this
        var b = target
        log('a.x a.y',a.x, a.y)
        log('b.x b.y b.w', b.x, b.y, b.w)
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }


}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function () {
            var s = SceneMain.new(game)
            game.replaceScene(s)
        })
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        var bird = Bird.new(game)
        this.bird = bird
        bird.x = 100
        bird.y = 200
        this.addElement(bird)

        //加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        //循环移动地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 550
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        this.setupInputs()
    }

    setupInputs(){
        var self = this
        var b = self.bird
        self.game.registerAction('a', function (keyStatus) {
            b.move(-2, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(2, keyStatus)
        })
        self.game.registerAction('j', function () {
            b.jump()
        })

    }
    update(){
        super.update()
        //地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0){
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++){
            var g = this.grounds[i]
            g.x += offset
        }
    }


    //
    // draw() {
    //     super.draw()
    //     // draw labels
    //     this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
}
