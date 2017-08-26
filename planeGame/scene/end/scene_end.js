class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.score = 0
        let bg = GuaImage.new(game, 'scene_end_bg')
        this.addElement(bg)
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        super.draw()
        // draw labels
        this.game.context.fillText('得分' + this.score, 80, 270)
        this.game.context.fillText('游戏结束, 按 r 返回标题界面', 80, 290)
    }
}
