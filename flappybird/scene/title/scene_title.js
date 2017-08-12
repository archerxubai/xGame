class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function () {
            var s = SceneMain.new(game)
            game.replaceScene(s)
        })
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        var bird = GuaAnimation.new(game)
        this.bird = bird
        bird.x = 100
        bird.y = 200
        this.addElement(bird)

        //循环移动地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 550
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        this.setupInputs()
    }

    setupInputs(){
        var self = this
        var b = self.bird
        self.game.registerAction('a', function (keyStatus) {
            b.move(-2, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(2, keyStatus)
        })
        self.game.registerAction('j', function () {
            b.jump()
        })

    }
    update(){
        super.update()
        //地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0){
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++){
            var g = this.grounds[i]
            g.x += offset
        }
    }


    //
    // draw() {
    //     super.draw()
    //     // draw labels
    //     this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
}
