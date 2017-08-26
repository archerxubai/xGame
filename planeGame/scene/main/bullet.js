class Bullet extends GuaImage{
    constructor(game) {
        log('build bullet')
        super(game, 'bullet')
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
        log('collide')
        var objs = this.game.scene.elements
        for (let i = 0; i < objs.length; i++) {
            let e = objs[i]
            // log('this is ', instanceof(e))
            if (e instanceof type) {
                if (this.collide(e)) {
                    log('been shooted')
                    e.destroy()
                    this.destroy()
                }
            }
        }
    }


    update(){
        var self = this
        self.y -= self.speed
    }


}

class PlayerBullet extends Bullet{
    constructor(game){
        super(game)
    }

    setup(){
        super.setup()
        this.speed = config.player_bullet_speed.value
    }

    update(){
        let self = this
        super.update()
        self.collideWith(Enemy)
        self.bulletColide()
    }

    bulletColide(){
        this.collideWith(EnemyBullet)
    }
}

class EnemyBullet extends Bullet{
    constructor(game){
        super(game)
    }

    setup(){
        super.setup()
        this.speed = config.enemy_bullet_speed.value
    }

    update(){
        let self = this
        self.y += self.speed
    }

}