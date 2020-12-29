import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled'
import {useSelector, useDispatch} from 'react-redux'
import {runQuery} from './state/query.js';

const Controls = styled.div({
    flex: '0 auto',
    marginTop: '0.5em',
    marginLeft: 'auto',
});

const SqlText = styled.textarea({
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    flex: '1 auto',
});

const Form = styled.div({
    padding: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxSizing: 'border-box',
});

export default function QueryForm({}) {
    const [sql, setSql] = useState('');
    const dispatch = useDispatch();

    const runQueryClicked = (e) => {
        dispatch(runQuery(sql));
    };

    const changeSql = (e) => {
        setSql(e.target.value);
    };

    return (
        <Form>
            <SqlText value={sql} onChange={changeSql} />
            <Controls>
                <button onClick={runQueryClicked}>Run Query</button>
            </Controls>
        </Form>
    );
}
