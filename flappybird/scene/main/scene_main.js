/**
 * Created by hasee on 2017/8/9.
 */

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

class Bullet extends GuaImage{
    constructor(game) {
        log('build bullet')
        log('bullet game', game)
        super(game, 'bullet')
        this.setup()
    }

    setup(){
        this.speed = config.bullet_speed
    }

    update(){
        this.y -= this.speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        log('build players')
        super(game, 'player')
        this.setup()
    }

    setup(){
        this.speed = 10
        this.coolDown = 6
    }

    update() {
        this.speed = config.player_speed
        if (this.coolDown > 0 ){
            this.coolDown--
        }
    }

    moveLeft(){
        this.x -= this.speed
    }

    moveRight(){
        this.x += this.speed
    }

    moveUp(){
        this.y -= this.speed
    }

    moveDown(){
        this.y += this.speed
    }

    fire(){
        if (this.coolDown == 0) {
            this.coolDown = config.coolDown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }

    }
}

class Enemy extends GuaImage {
    constructor(game) {
        log('build enemys')
        var type = randonBetween(0, 2)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup(){
        this.speed = randonBetween(2, 5)
        this.x = randonBetween(0, 350)
        this.y = -randonBetween(0, 200)
    }

    update() {
        this.speed = config.enemy_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }

}

