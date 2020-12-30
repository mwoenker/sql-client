import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'

import {queryReducer} from './query.js';
import {loginReducer} from './login.js';

const reducer = combineReducers({
    login: loginReducer,
    query: queryReducer,
});

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware));

export default store;
