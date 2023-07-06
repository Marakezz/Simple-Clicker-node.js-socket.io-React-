const express = require('express');
const app = express(); 
// const useSocket = require('socket.io');
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
    }
});
app.use(express.json());

const listOfUsers = new Map();


app.get('/users', (req, res) => {
    const users = [];
    [...listOfUsers].forEach((item, index) => {
        const obj = {
            userName: item[1].get('userName'),
            points: item[1].get('points'),
            status: item[1].get('status'),
            socketId: item[1].get('socket.id'),
            id: item[0]
        }
        users.push(obj);
    })
    res.json(users);
    
})



app.post('/newUser', (req, res) =>{
    const {userName} = req.body;
    let a = false;
    listOfUsers.forEach((value, id) => {
        if(value.get('userName') === userName) {
            if(value.get('status') === 'online') {
                res.json('Anavailable')
            } else {
                res.json(id)
            }
            a = true;
            // console.log('Такой уже есть');
            // value.set('socket.id', null);
            // value.set('status', 'offline');
        }
    })
    if(!a) {
       const b =  listOfUsers.size;
    listOfUsers.set(b, 
        new Map([
            ['socket.id', null],
            ['userName', userName],
            ['points', 0],
            ['status', 'online']
    ]))
    res.json(b)}
    res.send();

})

app.post('/buttonClicked', (req,res) => {
    listOfUsers.get(req.body.id).set('points', listOfUsers.get(req.body.id).get('points')+1);
    res.send();
})

const setUsers = () => {
    const users = [];
    [...listOfUsers].forEach((item, index) => {
        const obj = {
            userName: item[1].get('userName'),
            points: item[1].get('points'),
            status: item[1].get('status'),
            socketId: item[1].get('socket.id'),
            id: item[0],
            
        }
        users.push(obj);
    })
            users.sort(function(a,b)  {
            if(a.points > b.points)
            return -1;
            if(a.points < b.points)
            return 1;
            return 0;
            })
    io.sockets.emit('ROOM:SET_USERS', users);
}


io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', (obj, id) => { 
        listOfUsers.get(id).set('socket.id' , socket.id);
        listOfUsers.get(id).set('status' , 'online');

        setUsers();
    });

    socket.on('BUTTON:CLICKED', () => {
        setUsers();
    });


    socket.on('disconnect', () => {
        listOfUsers.forEach((value, id) => {
            if(value.get('socket.id') === socket.id) {
                value.set('socket.id', null);
                value.set('status', 'offline');
            }
        })

        setUsers();

        console.log('User DISconnected', socket.id);
    });

    console.log('User connected', socket.id);
});


server.listen(8888, (err) =>{  
    if(err) {
        throw Error(err);
    }
    console.log('Сервер запущен');
});