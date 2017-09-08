class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)





        //地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 510
            this.addElement(g)
            this.grounds.push(g)
        }

        //mario
        let mario = GuaNesSprite.new(game)
        mario.x = 100
        mario.y = 420
        this.addElement(mario)
        this.mario = mario

        this.setupInputs()
    }

    setupInputs(){
        let self = this
        let m = this.mario
        let playSpeed = 5
        self.game.registerAction('a', function (keyStatus) {
            m.move(-playSpeed, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            m.move(playSpeed, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            m.jump(keyStatus)
        })

    }

    update(){
        super.update()
    }

    draw() {
       super.draw()
    }
}
