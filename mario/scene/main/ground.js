/**
 * Created by hasee on 2017/8/25.
 */
class Grounds {
    constructor(game){
        this.game = game
         this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 510
            this.grounds.push(g)
        }
        this.skipCount = 4
    }

    static  new(game){
        return new this(game)
    }

    draw(){
        for (let g of this.grounds){
            g.draw()
        }
    }

    update(){
         this.skipCount--
        var offset = -5
        if (this.skipCount == 0){
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++){
            var g = this.grounds[i]
            g.x += offset
        }
    }
}