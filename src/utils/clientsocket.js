import { io } from 'socket.io-client';
import store from '../store/configureStore';
import { setOnlineUsers } from '../store/actions/onlineActions';
import { addMessage } from '../store/actions/messageActions';

class ClientSocket {

    init = () => {
        if (!this.initted) {
            this.initted = true;
            const server = process.env && process.env.NODE_ENV && process.env.NODE_ENV === "development" 
                ? 'http://localhost:3001'
                : '';
            this.socket = io(server);
            const userData = store.getState().user;
            this.user = {
                displayName: userData.displayName,
                avatar: userData.avatar,
                senderKey: userData.key
            }
            this.socket.on('users', this.getUsers);
            this.socket.on('message', this.getMessage);
            this.socket.emit('setUser', this.user);
        }
        
    }

    getUsers = (users) => {
        store.dispatch(setOnlineUsers(users));
    }

    getMessage = (msg) => {
        store.dispatch(addMessage(msg));
    }

    sendMessage = (message) => {
        const msg = {
            ...this.user,
            message
        }
        this.socket.emit('message', msg);
    }
}

const socket = new ClientSocket();
export default socket;