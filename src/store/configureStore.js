import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './reducers/userReducer';
import OnlineReducer from './reducers/onlineReducer';
import MessageReducer from './reducers/messageReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        user: UserReducer,
        online: OnlineReducer,
        messages: MessageReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;