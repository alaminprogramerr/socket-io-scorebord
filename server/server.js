var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
const PORT =process.env.PORT||5000
// app.use(express.static(__dirname + '/node_modules'));  
const userRouter=require('./router/userRouter')
const cors= require('cors')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const userModel=require('./model/registerModel');
const { use } = require('./router/userRouter');


app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())
app.use(userRouter)




io.on('connect',(socket)=>{
    console.log('user connected',socket.id)
    // position , name , high score
    socket.on('sendUserInfo',(data)=>{
        console.log('userinfo',data)
    })

    
    
    // send initial score bord all user
    userModel.find()
    .then(user=>{
        
        function compare( a, b ) {
            if ( a.score < b.score ){
            return 1;
            }
            if ( a.score > b.score ){
            return -1;
            }
            return 0;
        }
        const sorted=user.sort(compare)
        socket.emit('initialData',sorted)

    })
    .catch(err=>{
        console.log(err)
    })

    socket.on('pushScore',(data=>{
        console.log('data come',data)
        userModel.findOne({email:data.user})
        .then(user=>{
            user.score=data.score>user.score?data.score:user.score
            user.save()
            .then(doc=>{
                console.log('score updated')
                userModel.find()
                .then(users=>{
                    function compare( a, b ) {
                        if ( a.score < b.score ){
                        return 1;
                        }
                        if ( a.score > b.score ){
                        return -1;
                        }
                        return 0;
                    }
                    const sorted=users.sort(compare)
                    
                    io.emit('updateScore',sorted)
                    console.log('update sent to client')

                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }))

})





app.get('/', function(req, res,next) {  
    res.send('Hello')
});

server.listen(PORT,()=>{
    console.log('server started on  port', PORT)
    mongoose.connect('mongodb://localhost/game',{useUnifiedTopology:true,useNewUrlParser:true} ,(err)=>{
        if(err){
            return console.log(err)
        }
        console.log('Database connected ')
    } )
});




// socket.emit('message', "this is a test"); //sending to sender-client only
// socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
// socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
// socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
// socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
// io.emit('message', "this is a test"); //sending to all clients, include sender
// io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
// io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
// socket.emit(); //send to all connected clients
// socket.broadcast.emit(); //send to all connected clients except the one that sent the message
// socket.on(); //event listener, can be called on client to execute on server
// io.sockets.socket(); //for emiting to specific clients
// io.sockets.emit(); //send to all connected clients (same as socket.emit)
// io.sockets.on() ; //initial connection from a client.