class Enemy extends GuaImage {
    constructor(game) {
        log('build enemys')
        var type = randonBetween(0, 2)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup(){
        this.speed = randonBetween(2, 5)
        this.x = randonBetween(0, 350)
        this.y = -randonBetween(0, 200)
    }

    update() {
        this.speed = config.enemy_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }

}
