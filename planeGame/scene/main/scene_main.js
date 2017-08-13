/**
 * Created by hasee on 2017/8/9.
 */
var config = {
    player_speed: 10,
    enemy_speed: 4,
    bullet_speed: 4,
    coolDown: 2,
}

const randonBetween = function(start, end) {
    var n = Math.random() * (end - start +1)
    return Math.floor(n + start)
}

class SceneMain extends GuaScene {
    constructor(game) {
        super(game)


        // game.registerAction('k', function(){
        //     var s = Scene(game)
        //     game.replaceScene(s)
        // })
        this.setup()
        this.setupInputs()
    }

    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')

        this.player = Player.new(game)
        this.player.x = 150
        this.player.y = 300

        this.addElement(this.bg)
        this.addElement(this.player)
        this.addEnemies()

        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
    }

    addEnemies(){
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++){
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs(){
        var g = this.game
        var s = this
         this.game.registerAction('a', function () {
            s.player.moveLeft()
        })
        this.game.registerAction('d', function () {
            s.player.moveRight()
        })
         this.game.registerAction('w', function () {
            s.player.moveUp()
        })
        this.game.registerAction('s', function () {
            s.player.moveDown()
        })
        this.game.registerAction('f', function () {
            s.player.fire()
        })
    }



    // draw() {
    //     // draw labels
    //     // this.game.drawImage(this.bg)
    //     // this.game.drawImage(this.player)
    // }

    update() {
        super.update()
    }
}
