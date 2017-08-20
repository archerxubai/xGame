/**
 * Created by hasee on 2017/8/19.
 */
const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)
const log = console.log.bind(console)

enableDraw = false
points = []
gesture = []

const canvas = e("#id-canvas")
const ctx = canvas.getContext("2d")



const bindEvents = function () {
    canvas.addEventListener('mousedown', function (event) {
        enableDraw = true
        let x = event.offsetX
        let y = event.offsetY
        ctx.beginPath()
        ctx.moveTo(x,y);
    })

    canvas.addEventListener('mousemove', function (event) {
            if (enableDraw) {
                let x = event.offsetX
                let y = event.offsetY
                drawLine(x, y)
            }
        }
    )

    canvas.addEventListener('mouseup', function () {
        enableDraw = false
        log('mouseup', enableDraw)
        ctx.closePath()
        gesture.push(points)
        //給图形加框
        let rect = markedRect(points)
        log('rect', rect)
        drawRect(rect)
        points = []
    })

    let button = e('#id-button')
    button.addEventListener('click', function () {
        let img1 = gesture[0]
        let img2 = gesture[1]
        let newImg1 = zoomedImg(img1)
        let newImg2 = zoomedImg(img2)

        drawZoomedImg(newImg1, "#id-canvas-img1")
        drawZoomedImg(newImg2, "#id-canvas-img2")
        simulationJudege(newImg1, newImg2)


    })
}

 //判断相似度
const simulationJudege = function (img1, img2) {
    let sCount = 0
    let pointCount = Math.min(img1.length, img2.length)
    for (let i = 0; i < pointCount; i++) {
        let e1 = img1[i]
        img1.map((item) => {
            if (item.x == e1.x && item.y == e1.y) {
                sCount++
            }
        })
    }
    alert("相似度是" + sCount / pointCount)
}

//放缩图片到20像素
const zoomedImg = function (img) {
    let markRect = markedRect(img)
    let scale = 40
    let Xfactor = Math.abs((markRect.left - markRect.right) / scale)
    let Yfactor = Math.abs((markRect.top - markRect.floor) / scale)

    let zero = {
        x: markRect.left,
        y: markRect.top,
    }
    let imgChangedZero = img.map((item) => {
        item.x = item.x - zero.x
        item.y = item.y - zero.y
        return item
    })
    log('changed zero', imgChangedZero)

    let imgZoomed = imgChangedZero.map((item) => {
        item.x = Math.floor(item.x / Xfactor)
        item.y = Math.floor(item.y / Yfactor)
        return item
    })

    return imgZoomed
}

const drawLine = function (x, y) {
    let p = {
        x: x,
        y: y,
    }
    points.push(p)
    ctx.lineTo(x,y);
    ctx.stroke()
}

const drawRect = function (rect) {
    let x = rect.left
    let y = rect.top
    let width = rect.right - rect.left
    let height = rect.floor - rect.top
    ctx.strokeRect(x, y, width, height);
}

//把手势图形用矩形圈起来
const markedRect = function (img) {
    let firstPoint = img[0]
    let top = firstPoint.y
    let floor = firstPoint.y
    let right = firstPoint.x
    let left = firstPoint.x

    for (let i = 0; i < img.length; i++){
        let p = img[i]
        if (p.x < left){
            left = p.x
        }
        if (p.x > right){
            right = p.x
        }
        if(p.y > floor) {
            floor = p.y
        }
        if (p.y < top) {
            top = p.y
        }
    }
    return {
        top: top,
        floor: floor,
        right: right,
        left: left,
    }
}

//画放缩后的图形
const drawZoomedImg = function (img, selector) {
    const canvas = e(selector)
    const ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(img[0].x, img[0].y)
    for (let i = 0; i < img.length; i++){
        let p = img[i]
        ctx.lineTo(p.x, p.y);
        ctx.stroke()
    }
    ctx.closePath()
}


const _main = function () {
    bindEvents()
}
_main()