import React, {useState, useReducer, useEffect, useLayoutEffect, useRef} from 'react';
import {useLoginContext} from './login-context.js';
import validate from 'validate.js';
import styled from '@emotion/styled';
import credentialFormat from '../validators/credentials.js';

const Container = styled.div({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#ddd',
});

const LoginForm = styled.form({
    background: '#fff',
    padding: '1em',
    borderRadius: '0.5em',
    border: '1px solid #ddd',
    boxShadow: '0 0 1em #888',
});

const ButtonRow = styled.div({
    textAlign: 'right',
    padding: '0.5em',
});

const FormGroup = styled.div({
    display: 'table-row',
    '&>*': { margin: '0.5em' },
});

const Label = styled.label({
    display: 'table-cell',
});

const Input = styled.input({
    display: 'table-cell',
    border: '1px solid #888',
    padding: '0.25em',
    borderRadius: '3px',
});

const Error = styled.div({
    display: 'table-cell',
    color: '#c00',
    fontWeight: 'bold',
});

function Field({name, title, formState, onChange, formErrors, type='text'}) {
    const id = `login-${name}`;
    return (
        <FormGroup>
            <Label htmlFor={id}>
                {title}
            </Label>
            <Input id={id}
                   name={name}
                   type={type}
                   value={formState[name]}
                   onChange={onChange} />
            <Error>{formErrors[name] || null}</Error>
        </FormGroup>
    );
}

const loginFields = [
    {name: 'user', title: 'Username'},
    {name: 'password', title: 'Password', type: 'password'},
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

    const doLogin = (e) => {
        e.preventDefault();
        login(formState);
    };
        
    return (
        <Container>
            <LoginForm onSubmit={doLogin}>
                {loginError?.error || null}
                {loginFields.map(field => (
                    <Field name={field.name}
                           title={field.title}
                           key={field.name}
                           formState={formState}
                           onChange={change}
                           type={field.type}
                           formErrors={formErrors} />
                ))}
                <ButtonRow>
                    <button onClick={doLogin}>Login</button>
                </ButtonRow>
            </LoginForm>
        </Container>
    );
}

