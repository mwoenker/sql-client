import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Login from './login.js';
import {LoginContextProvider, useLoginContext} from './login-context.js';

function App({}) {
    const {loggedIn, credentials, logout} = useLoginContext();

    if (loggedIn) {
        return (
            <div>
                <pre>Creds: {JSON.stringify(credentials, null, 4)}</pre>
                <button onClick={logout}>Log out</button>
            </div>
        );
    } else {
        return <Login />;
    }
}

function AppContainer({}) {
    return (
        <LoginContextProvider>
            <App />
        </LoginContextProvider>
    );
}

ReactDOM.render(<AppContainer />, document.getElementById('app'));
