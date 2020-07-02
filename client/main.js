const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 800
canvas.height = 550


    
    
const socket=io('http://localhost:5000')
const userEmail=localStorage.getItem('game_token')
const positionEl=document.getElementById('position')
const nameEl=document.getElementById('name')
const scoreEl=document.getElementById('score')
socket.on('initialData',data=>{
    let position=null
    let user
    const userList = document.getElementById('userList')
    userList.innerHTML=''

    data.map(single => {
        const a = document.createElement('a')
        a.className = 'collection-item'
        a.innerHTML=single.name

        const span = document.createElement('span')
        span.classList = "badge"
        span.innerHTML = single.score

        a.appendChild(span)
        userList.appendChild(a)
    })
    position=data.findIndex(obj => obj.email === userEmail);
    user=data.find(item => item.email === userEmail);
    positionEl.innerHTML=position+1
    nameEl.innerHTML=user.name
    scoreEl.innerHTML=user.score



})


let spacePressed = false
let angle = 0
let hue = 0
let frame = 0
let score = 0
let gameSpeed = 4

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height )
    handleObstacles()
    b1rd.update()
    b1rd.draw()
    obst4cles.draw()
    handleCollisions()
    if(handleCollisions() === true) return;
    requestAnimationFrame(animate)
    frame++;
    ctx.font = "30px Arial"
    ctx.fillText("Score: " + score, 650, 50)
    
}
animate()


window.addEventListener("keydown", function(e){
    if(e.code === "Space") {
        spacePressed = true
    }
})
window.addEventListener("keyup", function(e){
    if(e.code === "Space") spacePressed = false;

})



