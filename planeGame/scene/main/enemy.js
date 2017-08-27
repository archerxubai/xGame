class Enemy extends GuaImage {
    constructor(game) {
        // log('build enemys')
        var type = randonBetween(0, 2)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup(){
        this.speedY = randonBetween(2, 5)
        this.speedX = randonBetween(-1, 1)
        this.x = randonBetween(0, 350)
        this.y = -randonBetween(0,200)
        this.coolDown = randonBetween(40, 100)
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
        let e = Enemy.new(self.game)
        self.game.scene.addElement(e)
        self.game.scene.removeElement(self)
    }

     fire(){
         if (this.coolDown == 0) {
             this.coolDown = randonBetween(config.enemy_fire_cooldown_min.value,
                                           config.enemy_fire_cooldown_max.value)
             var x = this.x + this.w / 2
             var y = this.y
             var b = EnemyBullet.new(this.game)
             b.x = x
             b.y = y
             this.scene.addElement(b)
         }

     }

    update() {
        this.speedY = config.enemy_speed.value * this.speedY
        this.speedX = config.enemy_speed.value * this.speedX
        this.coolDown--
        this.fire()
        this.y += this.speedY
        this.x += this.speedX
        this.borderLimited()

    }

    //如果超界，则重建
     borderLimited() {
        let rightBorder = this.game.canvas.width
        let leftBoreder = 0 - this.w
        let topBoreder = 0
        let floorBorder = this.game.canvas.height
        if (this.x < leftBoreder || this.x > rightBorder ){
            this.setup()
        }else if(this.y > floorBorder){
            this.setup()
        }
     }

}
