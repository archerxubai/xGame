/**
 * Created by hasee on 2017/8/27.
 */
class GuaNumber {
    constructor(game, number){
        this.game = game
        this.x = 0
        this.y = 0
        this.number = number
        this.textArray = String(number)
        this.imgs = this.imgFromText(this.textArray)
    }

    static new(game, number) {
        var i = new this(game, number)
        return i
    }

    refresh(number){
        this.number = number
        this.textArray = String(number)
        this.imgs = this.imgFromText(this.textArray)
    }

    string(num){
        let s = String(num)
        return s.split("")
    }

    imgFromText(textArray){
        let imgs = []
        let offset = 0
        for (let i = 0; i < textArray.length; i++){
            let n = textArray[i]
            let img = GuaImage.new(this.game, n)
            img.x = this.x + offset
            img.y = this.y
            offset = img.w
            imgs.push(img)
        }
        return imgs
    }

    draw() {
        let self = this
        let imgs = self.imgs
        for (let i = 0; i < imgs.length; i++) {
            self.game.drawImage(imgs[i])
        }
    }

    update(){}
}