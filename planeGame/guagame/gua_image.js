/**
 * Created by hasee on 2017/8/9.
 */
class GuaImage {
    constructor(game, name) {
        // log('GuaImage:', name)
        this.game = game
        this.texture = game.textureByName(name)
        // log('this.texture', this.texture)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }

    collide(target){
        var aInb = function (x, x1, x2) {
            return x >= x1 && x <= x2
        }
        var a = this
        var b = target
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }

    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

//逻辑上不应该继承GuaImage，暂时这么做吧
// class Player extends GuaImage {
//     constructor(game, name) {
//         super(game, name)
//
//     }
// }
