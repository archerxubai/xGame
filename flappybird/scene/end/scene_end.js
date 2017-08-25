class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
        this.score = 0
    }
    draw() {
        // draw labels
        this.game.context.fillText('得到'+ this.score + '分' + '游戏结束, 按 r 返回标题界面', 70, 290)
    }
}
