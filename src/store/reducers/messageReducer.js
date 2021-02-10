
export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_MESSAGE':
            const messages = state.slice(0);
            messages.push(action.message);
            return messages;
        default:
            return state;
    }
}