/**
 * Created by hasee on 2017/8/25.
 */
class Bird extends GuaAnimation {
    constructor(game) {
        super(game)
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height


        this.frameIndex = 0
        this.frameCount = 3
        this.rotation = 0
        //重力和加速度
        this.gy = 10
        this.vy = 0

    }

    update() {
        super.update()

        //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.1
        var h = 475
        if (this.y > h) {
            this.y = h
        }
        //更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 4
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }

        //和管子碰撞
        this.collideWithPipe()
    }

    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)

        context.restore()

    }

    jump() {
        this.vy = -10
        this.rotation = -45
    }

    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        var animationName = {
            down: 'run',
            up: 'idle',
        }
        var name = animationName[keyStatus]
        // this.changeAnimation(name)
    }

    collideWithPipe(){
        var self = this
        var objs = this.game.scene.elements
        for (let i = 0; i < objs.length; i++) {
            let e = objs[i]
            // log('this is ', instanceof(e))
            if (e instanceof Pipes) {
                for (let p of e.pipes) {
                    // log(this.collide(p))
                    if (this.collide(p)) {
                        var s = SceneEnd.new(this.game)
                        s.score = this.game.scene.score
                        self.game.replaceScene(s)
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
        // log('a.x a.y', a.x, a.y)
        // log('b.x b.y b.w', b.x, b.y, b.w)
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }


}