import {apiCall} from '../api.js';

const initialState = {state: 'idle', error: null, data: null};
                          
export function queryReducer(state = initialState, action) {
    switch (action.type) {
    case 'query/loading':
        return {state: 'loading', error: null, data: null}
    case 'query/error':
        return {state: 'error', error: action.payload, data: null};
    case 'query/loaded':
        return {state: 'loaded', error: null, data: action.payload};
    default:
        return state;
    }
};

export function runQuery(sql) {
    return async (dispatch, getState) => {
        dispatch({type: 'query/loading'});
        
        const credentials = getState().login.credentials;
        let result;
        
        try {
            result = await apiCall('/run-query', {
                ...credentials,
                sql
            });
        } catch (e) {
            console.error(e);
            dispatch({type: 'query/error', payload: e.data});
            return;
        }

        dispatch({type: 'query/loaded', payload: result});
    };
}

