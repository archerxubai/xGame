class SceneEdit extends GuaScene {
    constructor(game) {
        super(game)
        var s = this
        // this.levelNum = levels.length
        log('level num', this.levelNum)
        s.blocks = s.load(1)
        this.level = config.currentLevel
        this.saveCooldown = 5

        //监听事件
        for (let i = 0; i < this.levelNum; i++){
            let level = i + 1
            game.registerAction(level.toString(), function () {
                s.load(level)
                //
            })
        }
        game.canvas.addEventListener('click', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, event)
            s.newBlock(x, y)
        })

        game.registerAction('i', function(){
            let config = s.blocks
            if (s.saveCooldown == 0){
                s.saveCooldown = 5
                s.saveLevel(config)
            }
        })

        game.registerAction('r', function(){
            let s = SceneTitle.new(game)
            game.replaceScene(s)
        })

        game.registerAction('c', function () {
            let levelChoosed = config.currentLevel
            if(levelChoosed > levels.length){
                levelChoosed = levels.length
            }
            s.level = levelChoosed
            s.blocks = s.load(levelChoosed)
        })

    }

    saveLevel(config){
        log('save level')
        var blockPos = []
        for (let i = 0; i < config.length; i++){
            let e = config[i]
            log('element', e)
            let p = [e.x, e.y]
            blockPos.push(p)
        }
        levels.push(blockPos)
        log('levels:', levels)
    }

    newBlock(x, y){
        let s = this
        let height = 20
        let width = 40
        let location = [Math.round(x/width) * width, Math.round(y/height) * height]
        let block = new Block(s.game, location)
        for (let i = 0; i < s.blocks.length; i++){
            let b = s.blocks[i]
            if (block.x == b.x && block.y == b.y){
                let index = s.blocks.indexOf(b)
                log('delete blocks')
                s.blocks.splice(index, 1)
                return
            }
        }
        s.blocks.push(block)
    }

    load(num){
        let blocks = loadLevel(this.game, num)
        this.blocks = blocks
        this.level = num
        return blocks
    }

    update(){
        var s = this
        if(s.saveCooldown > 0){
            s.saveCooldown--
        }
        // s.level = config.currentLevel
        // var s = this
        // s.blocks = s.load(config.currentLevels)
    }

    draw() {
        // draw labels
        var s = this
        s.game.context.fillText('按i进行保存, 按数字键选关，按r返回， 按c选关', 150, 280)
        var text = '第' + s.level + '关'
        s.game.context.fillText(text, 40, 280)
        // s.blocks = s.load(config.currentLevel)
        // log('s.blocks', s.blocks)
        for (var i = 0; i < s.blocks.length; i++) {
            var block = s.blocks[i]
            if (block.alive) {
                this.game.drawImage(block)
            }
        }

    }
}
