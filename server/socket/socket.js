const io = require('socket.io');

function createIO(http) {
    console.log('create io')
    const server = io(
        http, 
        {
            cors: {
                origin: 'http://localhost:3000',
                methods: ["GET", "POST"]
            }
        });
    const users = {};

    const getUserArray = () => {
        const userArray = [];
        for (const key in users) {
            userArray.push(users[key]);
        }
        return userArray;
    };

    server.on('connection', (socket) => {
        socket.on('disconnect', () => {
            delete users[socket.conn.id];
            server.emit('users', getUserArray());
        });
        socket.on('setUser', (user) => {
            users[socket.conn.id] = user;
            server.emit('users', getUserArray());
        });
        socket.on('message', (msg) => {
            server.emit('message', msg);
        })
    });
}

module.exports = createIO;