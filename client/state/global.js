import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'

import {queryReducer} from './query.js';
import {loginReducer} from './login.js';

const freshQueryResult = {state: 'idle', error: null, data: null};
const initialState = {
    credentials: {
        user: '',
        password: '',
        database: '',
        host: '',
        port: 5432,
    },
    schemas: freshQueryResult,
    queryResult: freshQueryResult,
};

const reducer = combineReducers({
    login: loginReducer,
    queryResult: queryReducer,
});

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware));

export default store;
