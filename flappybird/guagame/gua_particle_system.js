/**
 * Created by hasee on 2017/8/10.
 */
class GuaParticle extends GuaImage{
    constructor(game){
        super(game, 'particle')
        this.setup()
    }

    setup(){
        this.life = 20
    }

    static new(game){
        return new this(game)
    }

    init(x, y, vx, vy){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update(){
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game){
        return new this(game)
    }
    setup(){
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 20
        this.particles = []
    }

    update(){
        this.duration--
        if (this.duration < 0){
            this.game.scene.removeElement(this)
        }
        //调加小火花
        if (this.particles.length < this.numberOfParticles){
            var p = GuaParticle.new(this.game)
            //设置初始化坐标
            var s = 5
            var vx = 0.5 * randonBetween(-s, s)
            var vy = 0.5 * randonBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        //更新所有小火花
        for(var p of this.particles){
            p.update()
        }
        //删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)

    }

    draw(){
        for(let p of this.particles){
            p.draw()
        }
    }
}