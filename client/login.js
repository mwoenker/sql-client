import React, {useState, useReducer, useEffect, useLayoutEffect, useRef} from 'react';
import {useLoginContext} from './login-context.js';
import validate from 'validate.js';
import credentialFormat from '../validators/credentials.js';

function Field({name, title, formState, onChange, formErrors}) {
    return (
        <div>
            <label>
                {title}
                <input name={name}
                       type="text"
                       value={formState[name]}
                       onChange={onChange} />
                {formErrors[name] || null}
            </label>
        </div>
    );
}

const loginFields = [
    {name: 'user', title: 'Username'},
    {name: 'password', title: 'Password'},
    {name: 'database', title: 'Database'},
    {name: 'host', title: 'Host'},
    {name: 'port', title: 'Port'},
];

function defaultState(credentials) {
    let state = {};
    for (const field of loginFields) {
        state[field.name] = credentials[field.name];
    }
    return state;
}
    
export default function Login({}) {
    const {login, credentials, loginError} = useLoginContext();
    const [formState, setFormState] = useState(() => defaultState(credentials));
    
    const formErrors = loginError?.formErrors ?? {};
    
    const change = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    };

    const doLogin = () => {
        login(formState);
    };
        
    return (
        <div>
            {loginError?.error || null}
            {loginFields.map(field => (
                <Field name={field.name}
                       title={field.title}
                       key={field.name}
                       formState={formState}
                       onChange={change}
                       formErrors={formErrors} />
            ))}
            <div>
                <button onClick={doLogin}>Login</button>
            </div>
        </div>
    );
}

