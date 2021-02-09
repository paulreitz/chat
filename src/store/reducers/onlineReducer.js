const defaultOnline = [];

export default (state = defaultOnline, action) => {
    switch(action.type) {
        case 'SET_ONLINE_USERS':
            return action.online;
        default:
            return state;
    }
}