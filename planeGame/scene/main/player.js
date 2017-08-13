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
