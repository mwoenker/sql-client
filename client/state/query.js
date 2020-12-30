import {apiCall} from '../api.js';

const initialState = {
    text: '',
    state: 'idle',
    error: null,
    data: null
};
                          
export function queryReducer(state = initialState, action) {
    switch (action.type) {
    case 'query/setText':
        return {...state, text: action.payload};
    case 'query/loading':
        return {...state, state: 'loading', error: null, data: null}
    case 'query/error':
        return {...state, state: 'error', error: action.payload, data: null};
    case 'query/loaded':
        return {...state, state: 'loaded', error: null, data: action.payload};
    case 'login/logout':
        return initialState;
    default:
        return state;
    }
};

export function setText(sql) {
    return {type: 'query/setText', payload: sql};
}

export function runQuery() {
    return async (dispatch, getState) => {
        dispatch({type: 'query/loading'});

        const state = getState();
        const credentials = state.login.credentials;
        const text = state.query.text;
        let result;
        
        try {
            result = await apiCall('/run-query', {
                ...credentials,
                sql: text
            });
        } catch (e) {
            console.error(e);
            dispatch({type: 'query/error', payload: e.data});
            return;
        }

        dispatch({type: 'query/loaded', payload: result});
    };
}

