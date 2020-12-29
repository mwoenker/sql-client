import {apiCall} from '../api.js';

const initialState = {
    credentials: {
        user: '',
        password: '',
        database: '',
        host: '',
        port: 5432,
    },
    schemas: {state: 'idle', error: null, data: null}
};
                          
export function loginReducer(state = initialState, action) {
    switch (action.type) {
    case 'login/loading':
        return {
            credentials: action.payload,
            schemas: {state: 'loading', error: null, data: null}
        };
    case 'login/error':
        return {
            ...state,
            schemas: {state: 'error', error: action.payload, data: null}
        };
    case 'login/loaded':
        return {
            ...state,
            schemas: {state: 'loaded', error: null, data: action.payload}
        };
    case 'login/logout':
        return {...initialState, credentials: state.credentials};
    default:
        return state;
    }
};

export function login(credentials) {
    return async (dispatch, getState) => {
        dispatch({type: 'login/loading', payload: credentials});
        
        let result;
        
        try {
            result = await apiCall('/get-tables', credentials);
        } catch (e) {
            console.error(e);
            dispatch({type: 'login/error', payload: e.data});
            return;
        }

        dispatch({type: 'login/loaded', payload: result});
    };
}

export const logout = () => ({type: 'login/logout'});
