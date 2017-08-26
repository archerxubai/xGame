/**
 * Created by hasee on 2017/8/11.
 */
class GuaLabel{
    constructor(game, text, x, y){
        this.game = game
        this.text = text
        this.x = x
        this.y = y
    }

    static new(game, text, x, y){
        return new this(game, text, x, y)
    }

    draw(){
        this.game.font = '20px serif'
        this.game.context.fillStyle = 'white'
        this.game.context.fillText(this.text, this.x, this.y)
    }

    update(){

    }
}