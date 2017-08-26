class Bullet extends GuaImage{
    constructor(game, picName) {
        // log('build bullet')
        super(game, picName)
        this.setup()
    }

    setup(){
        this.speed = 0
    }

    destroy(){
        let self = this
        self.game.scene.removeElement(self)
    }

    collideWith(type) {
        // log('collide')
        var objs = this.game.scene.elements
        for (let i = 0; i < objs.length; i++) {
            let e = objs[i]
            // log('this is ', instanceof(e))
            if (e instanceof type) {
                if (this.collide(e)) {
                    // log('been shooted')
                    e.destroy()
                    this.destroy()
                    return true
                }
            }
        }
        return false
    }


    update(){
        var self = this
        self.y -= self.speed

    }


}

class PlayerBullet extends Bullet{
    constructor(game){
        super(game, 'playBullet')
    }

    setup(){
        super.setup()
        this.speed = config.player_bullet_speed.value
    }

    update(){
        let self = this
        super.update()
        //子弹出屏删除，能降低卡顿
        if(self.y < 0){
            self.destroy()
        }
        if (self.collideWith(Enemy)){
            self.game.scene.score ++
        }
        self.bulletColide()
    }

    bulletColide(){
        return this.collideWith(EnemyBullet)
    }
}

class EnemyBullet extends Bullet{
    constructor(game){
        super(game, 'enemyBullet')
    }

    setup(){
        super.setup()
        this.speed = config.enemy_bullet_speed.value
    }

    collideWithPlayer(){
        return this.collideWith(Player)
    }

    update(){
        let self = this
        self.y += self.speed
        if(self.y > 550){
            self.destroy()
        }
        this.collideWithPlayer()
    }

}