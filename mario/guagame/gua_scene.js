class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugModeEnabled = true
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    draw() {
        for (let i = 0; i < this.elements.length; i++){
            let e = this.elements[i]
            // this.game.drawImage(e)
            e.draw()
        }

    }
    update() {
        if(this.debugModeEnabled){
            for (let i = 0; i < this.elements.length; i++){
                let e = this.elements[i]
                e.debug && e.debug()
            }
        }

        for (let i = 0; i < this.elements.length; i++){
            let e = this.elements[i]
            e.update()
        }
    }

    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }

    removeElement(e){
        let index = this.elements.indexOf(e)
        log('remove index', index)
        if( index != -1){
             this.elements.splice(index, 1)
        }

    }
}
