const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const bcrypt = require('bcrypt')
const cryptoRandomString = require('crypto-random-string');
const app = express()


let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors())
app.use(allowCrossDomain)
app.use(express.json())


const server = app.listen('8000', () => {
    console.log('Server running on port 8000')
})

io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

let users = []

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        const user = {id: socket.id, value: data}
        users.push(user)
        io.sockets.to(socket.id).emit('set_user', user)
        io.sockets.emit('set_users', users)
    })

    socket.on('send_message', async (obj) => {
        const hashMessageId = await bcrypt.hash(obj.messageId, 5)
        const msg = {
            ...obj,
            messageId: hashMessageId
        }
        io.sockets.emit('get_message', msg)
    })

    socket.on('disconnect', () => {
        users = users.filter(i => i.id !== socket.id)
        io.sockets.emit('set_users', users)
        console.log('User disconnected')

    })
})
