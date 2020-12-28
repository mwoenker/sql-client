import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

const ListContainer = styled.div({
    borderRadius: '4px',
    overflow: 'hidden',
    margin: '0 0.5em 0 0',
    position: 'relative',
});

const List = styled.ul({
    overflowY: 'scroll',
    height: '100%',
    flex: '1 1 auto',
    margin: 0,
    padding: '0.25em',
    listStyle: 'none',
    background: '#f8f8f8',
});

const Top = styled.div({
    paddingBottom: '1em',
    '& label': { paddingRight: '0.6em' },
});

export default function TableList({schemas}) {
    const [selectedSchema, setSelectedSchema] = useState('');

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
        <>
            <Top>
                <label for="schema-select">Schema</label>
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
            <List>
                {tables.map(table => <li key={table}>{table}</li>)}
            </List>
                </ListContainer>
        </>
    );
}

