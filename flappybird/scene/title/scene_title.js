class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        let title = GuaImage.new(game, 'title')
        title.x = 40
        title.y = 120

        this.addElement(title)

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
        this.game.context.font = '15px serif'
        this.game.context.fillStyle = 'white'
        this.game.context.fillText('按 k 开始游戏', 80, 270)
        this.game.context.fillText('按 j 跳跃', 80, 290)
    }
}
