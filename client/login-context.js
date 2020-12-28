import React, {createContext, useContext, useState} from 'react';

const LoginContext = createContext();

const freshQueryResult = {loading: false, error: undefined, data: undefined};
const freshLoginState = {
    state: 'loggedOut',
    credentials: {
        user: '',
        password: '',
        database: '',
        host: '',
        port: 5432,
    },
    loginError: null,
    schemas: {},
};

class ApiError extends Error {
    constructor(message, data, cause) {
        super(message);
        this.data = data;
        this.cause = cause;
        this.name = 'ApiError';
    }
};

async function apiCall(endpoint, params) {
    let result;

    try {
        result = await fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params),
        });
    } catch (e) {
        throw new ApiError('Network Error', {error: 'Network Error'}, e);
    }

    let resultData;
    try {
        resultData = await result.json();
    } catch (e) {
        console.error(e);
        throw new ApiError('API Error', {error: 'Unknown Error'}, e);
    }

    if (200 !== result.status) {
        throw new ApiError('API Error', resultData);
    }

    return resultData;
}

export function LoginContextProvider({children}) {
    const [loginState, setLoginState] = useState(freshLoginState);
    const [queryResult, setQueryResult] = useState(
        {loading: false, error: undefined, data: undefined});
    
    const update = (changedProps) => {
        setLoginState(oldState => ({...oldState, ...changedProps}));
    }

    const error = async (error) => {
        update({state: 'loggedOut', loginError: error});
    };
    
    const login = async (credentials) => {
        update({schemas: {}, credentials, state: 'verifying'});

        let result;
        try {
            result = await apiCall('/get-tables', credentials);
        } catch (e) {
            error(e.data);
            return;
        }

        update({
            state: 'loggedIn',
            loginError: null,
            schemas: result.schemas,
        });
    };

    const logout = () => {
        setLoginState(oldState => ({
            ...oldState,
            credentials: oldState.credentials
        }));
    };

    const runQuery = async (sql) => {
        setQueryResult({loading: true, error: undefined, data: undefined})

        let apiResult;
        try {
            apiResult = await apiCall('/run-query',{
                ...loginState.credentials,
                sql
            });
        } catch (e) {
            console.error(e);
            console.error('data', JSON.stringify(e));
            setQueryResult({loading: false, error: e.data, data: undefined});
            return;
        }

        setQueryResult({loading: false, error: false, data: apiResult});
    };

    const value = {...loginState, queryResult, login, logout, runQuery};

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLoginContext() {
    return useContext(LoginContext);
}

