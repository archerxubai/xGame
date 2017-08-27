
const randonBetween = function(start, end) {
    var n = Math.random() * (end - start +1)
    return Math.floor(n + start)
}

class SceneMain extends GuaScene {
   constructor(game) {
        super(game)
        // game.registerAction('k', function () {
        //     var s = SceneMain.new(game)
        //     game.replaceScene(s)
        // })

        this.setup()
        this.setupInputs()
    }

    setup(){
        let game = this.game
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        //加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        //循环移动地面
       this.grounds = Grounds.new(game)
        this.addElement(this.grounds)

        //加入计分板
        this.score = 0
        let scoreBoard = GuaNumber.new(game, this.score)
        this.scoreBoard = scoreBoard
        scoreBoard.x = 120
        scoreBoard.y = 150
        scoreBoard.refresh(this.score)
        this.addElement(scoreBoard)

        //加入鸟
        var bird = Bird.new(game)
        this.bird = bird
        bird.x = 100
        bird.y = 200
        this.addElement(bird)
    }

    setupInputs(){
        var self = this
        var b = self.bird
        // self.game.registerAction('a', function (keyStatus) {
        //     b.move(-2, keyStatus)
        // })
        // self.game.registerAction('d', function (keyStatus) {
        //     b.move(2, keyStatus)
        // })
        self.game.registerAction('j', function () {
            b.jump()
        })

    }

    draw(){
        super.draw()
        // this.game.context.fillText('分数'+ this.score, 100, 190)
    }

    update(){
        super.update()
        this.countScore()
        if(window.paused == true){
            return
        }
        this.scoreBoard.refresh(this.score)
    }

    //计算分数
    countScore(){
        for (let p of this.pipe.pipes){
            //过柱子加一分，只计算上面的柱子
            if (this.bird.x > p.x && p.counted == false && p.flipY == true){
                this.score++
                p.counted = true
            }
        }

    }

}

