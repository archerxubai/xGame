class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            log('enter game')
            var s = Scene(game)
            game.replaceScene(s)
        })
        game.registerAction('e', function(){
            log('enter edit')
            var s = new SceneEdit(game)
            game.replaceScene(s)
            log('actions', game.actions)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
