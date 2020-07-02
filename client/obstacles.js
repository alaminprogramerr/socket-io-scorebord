const pilaTop = new Image()
pilaTop.src = "toptrans.png"

const pilaBottom = new Image()
pilaBottom.src = "bottomtrans.png"

const obstaclesArray = []

class Obstacles {
    constructor() {

        this.counted = false
        //coordenates of the top image
        this.topsX = canvas.width * 2.7
        this.topsY = 0

        //coordenates of bottom image
        this.bottomsX = canvas.width * 2.7 + 10;
        this.bottomsY = 5;


        //size of top pipe
        var max = 200;
        var min = 150;
        this.widthTop = 140

        //getting random number on top pipe size
        this.heightTop = Math.floor(Math.random() * (max - min)) + min;


        //size of bottom pipe
        var max2 = 260;
        var min2 = 150;

        //getting random number on bottom pipe size
        var random = Math.floor(Math.random() * (max2 - min2)) + min2;
        this.widthBottom = 140;

        //limiting pipe sizes
        if (this.heightTop != random) {
            this.heightBottom = random;
        }
        //gap
        else if ((random - this.heightTop) < 10) {
            this.heightBottom = random - 10;
        }
        else {
            this.heightBottom = random + 10;
        }

    }
    draw() {
        var a = 550
        var temp = this.bottomsY + (a - this.heightBottom) + 20
        ctx.drawImage(pilaTop, this.topsX, this.topsY, this.widthTop, this.heightTop)
        ctx.drawImage(pilaBottom, this.bottomsX, temp, this.widthBottom, this.heightBottom)
        // console.log(this.bottomsY+(a-this.heightBottom))
        //+(a-this.heightBottom)
    }

    update() {
        this.topsX -= gameSpeed
        this.bottomsX -= gameSpeed
        this.draw()
        if (this.counted === false && b1rd.x > this.topsX) {
            score++
            this.counted = true
        }
    }
}

function handleObstacles() {
    if (frame % 100 === 0) {
        obstaclesArray.unshift(new Obstacles)
    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update()
    }
    if (obstaclesArray.length > 30) {
        obstaclesArray.pop(obstaclesArray[0])
    }
}

function handleCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        // need to bring socket io  in there
        if (b1rd.x <= obstaclesArray[i].topsX + obstaclesArray[i].widthTop &&
            b1rd.x + b1rd.width >= obstaclesArray[i].topsX + 242 &&
            ((b1rd.y <= obstaclesArray[i].heightTop) || (b1rd.y >= 545 - obstaclesArray[i].heightBottom && b1rd.y + b1rd.height <= 540))) {
            ctx.fillText("Abre os olhos!", 295, 260)
            ctx.fillText("Score: " + score, 650, 50)
            let vis = document.querySelector(".btn")
            vis.style.visibility = "visible"
            vis.addEventListener("click", () => {
                location.reload(true)
            })

            console.log('logging 2')
            const user = window.localStorage.getItem('game_token')
            socket.emit('pushScore', { score: score, user: user })


            socket.on('updateScore', (data) => {

                const userList = document.getElementById('userList')
                userList.innerHTML=''

                data.map(single => {
                    const a = document.createElement('a')
                    a.className = 'collection-item'
                    a.innerHTML=single.name

                    const span = document.createElement('span')
                    span.classList = " badge"
                    span.innerHTML = single.score

                    a.appendChild(span)
                    userList.appendChild(a)
                })
            })



            return true
        } else if (b1rd.y > 455) {
            console.log('logging 1')

            const user = window.localStorage.getItem('game_token')
            socket.emit('pushScore', { score: score, user: user })
            

            socket.on('updateScore', (data) => {

                const userList = document.getElementById('userList')
                userList.innerHTML=''
                data.map(single => {
                    const a = document.createElement('a')
                    a.className = 'collection-item'
                    a.innerHTML=single.name

                    const span = document.createElement('span')
                    span.classList = " badge"
                    span.innerHTML = single.score

                    a.appendChild(span)
                    userList.appendChild(a)
                })
            })








            ctx.fillText("Abre os olhos!", 295, 260)
            ctx.fillText("Score: " + score, 650, 50)
            let vis = document.querySelector(".btn")
            vis.style.visibility = "visible"
            vis.addEventListener("click", () => {
                location.reload(true)
            })
            return true
        }
    }
}
const obst4cles = new Obstacles()
