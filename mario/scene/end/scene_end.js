class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)

        this.setup()

        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    setup(){
        let game = this.game
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        let over = GuaImage.new(game, 'game_over')
        over.x = 40
        over.y = 90
        this.addElement(over)

        //地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 510
            this.addElement(g)
            this.grounds.push(g)
        }

        //计分板
        this.score = 0
        let scoreBoard = GuaNumber.new(game, this.score)
        this.scoreBoard = scoreBoard
        scoreBoard.x = 120
        scoreBoard.y = 150
        scoreBoard.refresh(this.score)
        this.addElement(scoreBoard)

    }

    draw() {
        super.draw()
        this.scoreBoard.refresh(this.score)
        // draw labels
        this.game.context.font = '15px serif'
        this.game.context.fillStyle = 'white'
        this.game.context.fillText('游戏结束, 按 r 返回标题界面', 50, 250)
    }
}
