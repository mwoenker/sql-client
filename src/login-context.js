import React, {createContext, useContext, useState} from 'react';

const LoginContext = createContext();

export function LoginContextProvider({children}) {
    const [loginState, setLoginState] = useState({
        loggedIn: false,
        credentials: {
            username: '',
            password: '',
            host: '',
            port: 5432,
        },
    });
    
    const login = ({username, password, host, port}) => {
        setLoginState({
            loggedIn: true,
            credentials: {username, password, host, port},
        });
    };

    const logout = () => {
        setLoginState({...loginState, loggedIn: false});
    };

    const value = {...loginState, login, logout};

    console.log({loginState});

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLoginContext() {
    return useContext(LoginContext);
}

