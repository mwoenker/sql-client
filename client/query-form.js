import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled'
import {useSelector, useDispatch} from 'react-redux'
import {runQuery} from './state/query.js';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/sql/sql.js'

const Controls = styled.div({
    flex: '0 auto',
    marginTop: '0.5em',
    marginLeft: 'auto',
});

const SqlText = styled.div({
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    flex: '1 auto',
    '& .CodeMirror': {
        border: '1px solid #ddd',
        height: '100%',
    },
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
    const containerRef = useRef();
    const editorRef = useRef();
    
    // setup codemirror
    const updateRef = (container) => {
        if (container && containerRef.current !== container) {
            containerRef.current = container
            container.innerHTML = '';
            
            editorRef.current = CodeMirror(container, {
                mode: 'sql',
                viewportMargin: Infinity,
            });
            
            const doc = editorRef.current.getDoc();
            doc.on('change', () => {
                setSql(doc.getValue());
            });
        }
    }

    // Update editor when sql changes
    useEffect(
        () => {
            if (editorRef.current) {
                const doc = editorRef.current.getDoc();
                if (doc.getValue() !== sql) {
                    doc.setValue(sql);
                }
            }
        },
        [sql]
    );

    const runQueryClicked = (e) => {
        dispatch(runQuery(sql));
    };

    const changeSql = (e) => {
        setSql(e.target.value);
    };

    return (
        <Form>
            <SqlText ref={updateRef} />
            <Controls>
                <button onClick={runQueryClicked}>Run Query</button>
            </Controls>
        </Form>
    );
}
