import { io } from 'socket.io-client';
import store from '../store/configureStore';

export default class ClientSocket {
    constructor() {
        const server = process.env && process.env.NODE_ENV && process.env.NODE_ENV === "development" 
                ? 'http://localhost:3001'
                : '';
        this.socket = io(server);
        const userData = store.getState().user;
        this.user = {
            displayName: userData.displayName,
            avatar: userData.avatar,
            key: userData.key
        }
        this.socket.on('users', this.getUsers);
        this.socket.on('message', this.getMessage);
        this.socket.emit('setUser', this.user);
        console.log(this.user);
    }

    getUsers = (users) => {
        // Store currently online users in the store
        console.log(users);
    }

    getMessage = (msg) => {
        // add the message with user data to the store.
        console.log(msg);
    }

    sendMessage = (message) => {
        const msg = {
            ...this.user,
            message
        }
        this.socket.emit('message', msg);
    }
}