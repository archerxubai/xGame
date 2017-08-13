var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}

class Bullet extends GuaImage{
    constructor(game) {
        log('build bullet')
        log('bullet game', game)
        super(game, 'bullet')
        this.setup()
    }

    setup(){
        this.speed = config.bullet_speed
    }


    update(){
        var b = this
        this.y -= this.speed
        var objs = this.game.scene.elements
        for (let i = 0; i < objs.length; i++){
            let e = objs[i]
            // log('this is ', instanceof(e))
            if (e instanceof Enemy){
                if (this.collide(e)){
                    log('been shooted')
                    this.game.scene.removeElement(e)
                    this.game.scene.removeElement(b)
                }
            }
        }
    }

    collide(target){
        var a = this
        var b = target
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
}
