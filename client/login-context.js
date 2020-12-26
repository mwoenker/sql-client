import React, {createContext, useContext, useState} from 'react';

const LoginContext = createContext();

export function LoginContextProvider({children}) {
    const [loginState, setLoginState] = useState({
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
    });

    const error = async (error) => {
        setLoginState(oldState => ({
            ...oldState,
            state: 'loggedOut',
            loginError: error,
        }));
    };
    
    const login = async (credentials) => {
        setLoginState(oldState => ({
            ...oldState,
            schemas: {},
            credentials,
            state: 'verifying'
        }));

        let result;
        try {
            result = await fetch('/get-tables', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
            });
        } catch (e) {
            error({error: 'Network Error'});
            return;
        }

        if (200 !== result.status) {
            error(await result.json());
        } else {
            const response = await result.json();
            setLoginState(oldState => ({
                ...oldState,
                state: 'loggedIn',
                loginError: null,
                schemas: response.schemas,
            }))
        }
    };

    const logout = () => {
        setLoginState({...loginState, state: 'loggedOut'});
    };

    const value = {...loginState, login, logout};

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLoginContext() {
    return useContext(LoginContext);
}

