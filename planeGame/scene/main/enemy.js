class Enemy extends GuaImage {
    constructor(game) {
        // log('build enemys')
        var type = randonBetween(0, 2)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup(){
        this.speed = randonBetween(2, 5)
        this.x = randonBetween(0, 350)
        this.y = -randonBetween(0, 400)
        this.coolDown = randonBetween(100, 200)
    }

    explode(){
        let self = this
        log('Enemy x, y', self.x, self.y)
         var ps = GuaParticleSystem.new(self.game, self.x, self.y)
        self.game.scene.addElement(ps)
    }

    destroy(){
        let self = this
        self.explode()
        self.setup()
    }

     fire(){
         if (this.coolDown == 0) {
             this.coolDown = randonBetween(50, 200)
             var x = this.x + this.w / 2
             var y = this.y
             var b = EnemyBullet.new(this.game)
             b.x = x
             b.y = y
             this.scene.addElement(b)
         }

     }

    update() {
        this.speed = config.enemy_speed.value
        this.coolDown--
        this.fire()
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }

}
