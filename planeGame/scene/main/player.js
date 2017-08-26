/**
 * Created by hasee on 2017/8/9.
 */

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
         this.speed = config.player_speed.value
         if (this.coolDown > 0 ){
             this.coolDown--
         }
         this.collideWithEnemy()
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
             this.coolDown = config.coolDown.value
             var x = this.x + this.w / 2
             var y = this.y
             var b = PlayerBullet.new(this.game)
             b.x = x
             b.y = y
             this.scene.addElement(b)
         }

     }

     destroy(){
         let self = this
         let ps = GuaParticleSystem.new(self.game, self.x, self.y)
         self.game.scene.addElement(ps)
         self.game.scene.removeElement(self)
         //替换场景传分
         let s = SceneEnd.new(self.game)
         s.score = this.game.scene.score
         self.game.replaceScene(s)
     }

     collideWithEnemy() {
        // log('collide')
        var objs = this.game.scene.elements
        for (let i = 0; i < objs.length; i++) {
            let e = objs[i]
            // log('this is ', instanceof(e))
            if (e instanceof Enemy) {
                if (this.collide(e)) {
                    this.destroy()
                    return true
                    // let s = SceneEnd.new(this.game)
                    // this.game.replaceScene(s)
                }
            }
        }
        return false
    }
 }
