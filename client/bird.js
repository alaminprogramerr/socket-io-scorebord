const sprite = new Image()
sprite.src = "ti.png"


class Bird {
    constructor(){
       this.x = 100     
       this.y = 100
       this.vy = 0
       this.width = 250
       this.height = 100
       this.weight = .7
    }
    //update for each frame of animation
    update(){
        if(this.y > canvas.height - this.height + 6.5) {
            this.y = canvas.height - this.height + 6.5
            this.vy = 0
            
        } else {
            this.vy = this.vy + this.weight
            this.y = this.y + this.vy
            this.vy *= 0.7
        }

        if(this.y < this.height - 7){
            this.y = this.height - 7 
            this.vy = 0
        }   
        if (spacePressed) b1rd.flap()
    }
    draw(){
        // ctx.fillStyle = 'red'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height )
    }
    flap(){
        this.vy = this.vy - 3
    }
}

const b1rd = new Bird()