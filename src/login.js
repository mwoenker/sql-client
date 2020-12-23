import React, {useState, useReducer, useEffect, useLayoutEffect, useRef} from 'react';

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
];
    
export default function Login({}) {
    const [formState, setFormState] = useState({});

    const change = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    };
        
    return (
        <div>
            {loginFields.map(field => (
                <Field {...field}
                       formState={formState}
                       onChange={change} />
            ))}
        </div>
    );
}
