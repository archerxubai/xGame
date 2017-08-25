/**
 * Created by hasee on 2017/8/11.
 */
class GuaAnimation {
    constructor(game) {
        this.game = game
        //为了省事，在这里硬编码一套
        this.animations = {
            idle: [],
            run: [],
        }

        this.animationName = 'idle'
        this.flipX = false
    }

    static new(game){
        return new this(game)
    }

    frames(){
        return this.animations[this.animationName]
    }
    update(){}

    draw(){}

    changeAnimation(name){
        this.animationName = name
    }
}