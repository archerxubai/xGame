class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        var bird = GuaImage.new(game, 'b1')
        this.bird = bird
        bird.x = 100
        bird.y = 200
        this.addElement(bird)


        //地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 510
            this.addElement(g)
            this.grounds.push(g)
        }

        this.setupInputs()
    }

    setupInputs(){
        let self = this
        self.game.registerAction('k', function (keyStatus) {
            log('begin to run')
            let s = SceneMain.new(self.game)
            self.game.replaceScene(s)
        })

    }

    update(){
        super.update()
    }

    draw() {
        super.draw()
        this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
