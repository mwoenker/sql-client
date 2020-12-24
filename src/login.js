import React, {useState, useReducer, useEffect, useLayoutEffect, useRef} from 'react';
import {useLoginContext} from './login-context.js';

function Field({name, title, formState, onChange}) {
    return (
        <div>
            <label>
                {name}
                <input name={name}
                       type="text"
                       value={formState[name]}
                       onChange={onChange} />
            </label>
        </div>
    );
}

const loginFields = [
    {name: 'username', title: 'Username'},
    {name: 'password', title: 'Password'},
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
    const {login, credentials} = useLoginContext();
    const [formState, setFormState] = useState(() => defaultState(credentials));
    
    const change = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    };

    const doLogin = () => {
        login(formState);
    };
        
    return (
        <div>
            {loginFields.map(field => (
                <Field name={field.name}
                       title={field.title}
                       key={field.name}
                       formState={formState}
                       onChange={change} />
            ))}
            <div>
                <button onClick={doLogin}>Login</button>
            </div>
        </div>
    );
}

