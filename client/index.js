import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Login from './login.js';
import {LoginContextProvider, useLoginContext} from './login-context.js';

function QueryView({}) {
    const [selectedSchema, setSelectedSchema] = useState('');
    const {schemas} = useLoginContext();

    useEffect(
        () => {
            if (schemas && ! schemas.hasOwnProperty(selectedSchema)) {
                // If selectedSchema isn't in list, set it to 'public'
                // Failing that, the first schema we find
                if (schemas.hasOwnProperty('public')) {
                    setSelectedSchema('public')
                } else {
                    const schemaNames = Object.keys(schemas);
                    if (schemaNames.length > 0) {
                        setSelectedSchema(Object.keys(schemas)[0]);
                    } else {
                        setSelectedSchema('');
                    }
                }
            }
        },
        [schemas],
    );

    const selectSchema = (e) => {
        setSelectedSchema(e.target.value);
    };
    
    const tables = schemas[selectedSchema] ?? [];

    return (
        <div>
            <label>Schema
                <select value={selectedSchema} onChange={selectSchema}>
                    {Object.keys(schemas).map(schema => (
                        <option key={schema} value={schema}>{schema}</option>
                    ))}
                </select>
            </label>
            <ul>
                {tables.map(table => <li key={table}>{table}</li>)}
            </ul>
        </div>
    );
}

function App({}) {
    const {state, credentials, logout} = useLoginContext();

    if ('loggedIn' === state) {
        return (
            <div>
                <QueryView />
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
