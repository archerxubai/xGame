/**
 * Created by hasee on 2017/8/28.
 */
class GuaNesSprite {
    constructor(game) {
        this.game = game
        this.tileOffset = 32784
        this.data = window.bytes.slice(this.tileOffset)
        //为了省事，在这里硬编码一套
        this.animations = {
            idle: [],
            run: [],
        }



        // this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 4

        this.pixelWidth = 3
        this.rowsOfSprite = 4
        this.columnsOfSprite = 2

        this.w = this.pixelWidth * this.columnsOfSprite * 8
        this.h = this.pixelWidth * this.rowsOfSprite * 8

        this.animationName = 'idle'
        this.flipX = false

        this.rotation = 0
        //重力和加速度
        this.gy = 10
        this.vy = 0
    }

    static new(game){
        return new this(game)
    }

    drawBlock(context, data, x, y, pixelWidth) {
        const colors = [
            'white',
            '#FE0100',
            "#FFB010",
            '#AA3030',
        ]
        let w = pixelWidth
        let h = pixelWidth
        for (let i = 0; i < 8; i++) {
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
                //8 个比特 一行 j个循环中每一次画一个像素点
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let pixel = (c2 << 1) + c1
                if (pixel == 0){
                    continue
                }
                let color = colors[pixel]
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }
        }
    }

    drawSprite () {
        let bytesPerBlock = 16
        let dataOffset = this.frameIndex * bytesPerBlock * 8
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        let pixelsPerBlock = 8
        let pixelWidth = this.pixelWidth
        let blockSize = pixelsPerBlock * pixelWidth
        let offset = 0
        for (var i = 0; i < this.rowsOfSprite; i++){
            for (var j = 0; j < this.columnsOfSprite; j++){
                let x = j * blockSize
                let y = i * blockSize
                let pixels = data.slice(offset)
                this.drawBlock(context, pixels, x, y, pixelWidth)
                offset += 16
            }
        }
    }

    // drawNes(bytes) {
    //     let canvas = e('#id-canvas')
    //     let context = canvas.getContext('2d')
    //
    //     let blockSize = 8 //一个图块8个像素
    //     let pixelSize = 8
    //     let pixelWidth = this.pixelWidth
    //     let numberOfBytesPerBlock = 16
    //
    //     for (let i = 0; i < blockSize; i++) {
    //         for (let j = 0; j < blockSize; j++) {
    //             let x = j * pixelSize * pixelWidth
    //             let y = i * pixelSize * pixelWidth
    //             let index = window.offset + (i * 8 + j) * numberOfBytesPerBlock
    //             drawBlock(context, bytes.slice(index), x, y, pixelWidth)
    //         }
    //     }
    // }

    frames(){
        return this.animations[this.animationName]
    }
    update(){
          //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.1
        var h = 440
        if (this.y > h) {
            this.y = h

        }

        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex++
            this.frameIndex %= 3
            // this.frameIndex = (this.frameIndex + 1) % this.frames().length
            // this.texture = this.frames()[this.frameIndex]
        }
    }

    draw(){
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        this.drawSprite()

        context.restore()
    }

    changeAnimation(name){
        this.animationName = name
    }

      jump() {
        this.vy = -10
    }

    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        var animationName = {
            down: 'run',
            up: 'idle',
        }
        var name = animationName[keyStatus]
        // this.changeAnimation(name)
    }
}