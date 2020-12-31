import React, {useState, useReducer, useEffect, useLayoutEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import {login} from './state/login.js';
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
    width: '400px',
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
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0.5em',
});

const Label = styled.label({
    padding: '0.25em',
    flex: '0 0 30%',
    boxSizing: 'border-box',
});

const Input = styled.input({
    flex: '0 0 70%',
    border: '1px solid #888',
    padding: '0.25em',
    borderRadius: '3px',
    boxSizing: 'border-box',
});

const Error = styled.div({
    width: '100%',
    color: '#a00',
    fontWeight: 'bold',
    paddingTop: '0.25em',
    boxSizing: 'border-box',
    textAlign: 'right',
    fontSize: '85%',
    height: '1em',
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
    const credentials = useSelector(state => state.login.credentials);
    const loginData = useSelector(state => state.login.schemas);
    const dispatch = useDispatch();
    const [formState, setFormState] = useState(credentials)

    // update form state when credentials changes
    useEffect(
        () => { setFormState(credentials); },
        [credentials]
    );
    
    const formErrors = loginData.error?.formErrors ?? {};
    
    const change = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    };

    const doLogin = (e) => {
        e.preventDefault();
        dispatch(login(formState));
    };
        
    return (
        <Container>
            <LoginForm onSubmit={doLogin}>
                {loginData.error?.message || null}
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

