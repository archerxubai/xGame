
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup(){
        let game = this.game
        var label = GuaLabel.new(game, '按 k 开始游戏', 100, 450)
        let bg = GuaImage.new(game, 'scene_title_bg')
        this.addElement(bg)
        this.addElement(label)


    }

    setupInputs(){
        log('setup this',this)
        var self = this
        self.game.registerAction('k', function(){
            var s = SceneMain.new(self.game)
            self.game.replaceScene(s)
        })
        //
        // this.game.registerAction('a' ,function (keyStatus) {
        //     //此时的this是game.actions，因为按键事件执行时，执行的是g.actions[key]()，
        //     // self由于是一个变量，固定指向了SceneTitle
        //     self.w.move(-2, keyStatus)
        // })
        // this.game.registerAction('d', function (keyStatus) {
        //     self.w.move(2, keyStatus)
        // })
    }
    //
    // draw() {
    //     super.draw()
    //     // draw labels
    //     this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
}
