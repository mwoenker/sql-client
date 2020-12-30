import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import {useDispatch} from 'react-redux'
import {runQuery, setText} from './state/query.js';

const ListContainer = styled.div({
    borderRadius: '4px',
    overflow: 'hidden',
    margin: '0 0.5em 0 0.5em',
    position: 'relative',
});

const List = styled.ul({
    overflowY: 'scroll',
    height: '100%',
    flex: '1 1 auto',
    margin: 0,
    padding: '0.25em',
    boxSizing: 'border-box',
    listStyle: 'none',
    background: '#f8f8f8',
    '& li': {
        padding: '0.25em',
    },
    '& li:hover': {
        background: '#ccc',
    }
});

const Top = styled.div({
    padding: '0.5em 0 1em 0.5em',
    '& label': { paddingRight: '0.6em' },
});

export default function TableList({schemas}) {
    const [selectedSchema, setSelectedSchema] = useState('');
    const dispatch = useDispatch();

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

    const sqlDoubleQuote = (text) => {
        return '"' + text.replace('"', '""') + '"';
    }

    const listClicked = (e) => {
        const table = e.target.dataset.table;
        // assume public is in search path, everything else isn't (this could
        // be wrong)
        if (table) {
            const tableName = 'public' === selectedSchema
                  ? sqlDoubleQuote(table)
                  : (sqlDoubleQuote(selectedSchema) + '.' +
                     sqlDoubleQuote(table));
            
            dispatch(setText(`SELECT * FROM ${tableName}`));
        }
    };
    
    const tables = schemas[selectedSchema] ?? [];

    return (
        <>
            <Top>
                <label htmlFor="schema-select">Schema</label>
                <select id="schema-select"
                        value={selectedSchema}
                        onChange={selectSchema}
                >
                    {Object.keys(schemas).map(schema => (
                        <option key={schema} value={schema}>{schema}</option>
                    ))}
                </select>
            </Top>
            <ListContainer>
                <List onClick={listClicked}>
                    {tables.map(table => (
                        <li data-table={table}key={table}>{table}</li>
                    ))}
                </List>
            </ListContainer>
        </>
    );
}

