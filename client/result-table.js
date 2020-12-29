import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled'

const Container = styled.div({
    overflow: 'auto',
    padding: '0.5em',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    '& table': {borderSpacing: 0},
    '& thead tr': {background: '#ccc'},
    '& tbody tr:nth-child(odd)': {background: '#ddd'},
    '& tbody tr:nth-child(even)': {background: '#eee'},
    '& th': {
        padding: '0.25em',
        textAlign: 'left',
        userSelect: 'none',
    },
    '& td': {padding: '0.25em'},
});

const NullValue = styled.span({
    background: '#aaa',
    border: '1px solid #888',
    borderRadius: '3px',
});

function HeaderRow({data, onHeaderClicked}) {
    return (
        <tr>
            {data.map((cellData, i) => (
                <th key={i}
                    onClick={e => onHeaderClicked(i)}>
                    {cellData}
                </th>
            ))}
        </tr>
    );
}

function Cell({data}) {
    if (null === data) {
        return <NullValue>NULL</NullValue>;
    } else {
        return data;
    }
}

function Row({data}) {
    return (
        <tr>
            {data.map((cellData, i) => (
                <td key={i}>
                    <Cell data={cellData} />
                </td>
            ))}
        </tr>
    );
}

function Results({data}) {
    const [sortColumn, setSortColumn] = useState({
        index: null,
        descending: false,
    });

    // when we get new results, reset sort column
    useEffect(
        () => {
            setSortColumn({index: null, descending: false});
        },
        [data]
    );

    const sortClicked = (idx) => {
        if (null !== sortColumn.index && idx === sortColumn.index) {
            setSortColumn(old => ({...old, descending: ! old.descending}));
        } else {
            setSortColumn({index: idx, descending: false});
        }
    }

    const compare = (a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        } else if (a && b) {
            return a.localeCompare(b);
        } else {
            return 0;
        }
    };

    let sortedRows = data.rows;
    if (null !== sortColumn.index) {
        sortedRows = sortedRows.sort((a, b) =>
            compare(a[sortColumn.index], b[sortColumn.index]))
        
        if (sortColumn.descending) {
            sortedRows.reverse();
        }
    }
    
    return (
        <table>
            <thead>
                <HeaderRow
                    data={data.columns}
                    onHeaderClicked={sortClicked} />
            </thead>
            <tbody>
                {sortedRows.map((row, i) => <Row key={i} data={row} />)}
            </tbody>
        </table>
    );
}

export default function ResultTable({state, error, data}) {
    if ('loading' === state) {
        return <Container>loading...</Container>;
    } else if ('error' === state) {
        return <Container>{error.message}</Container>;
    } else if ('loaded' === state) {
        return <Container><Results data={data} /></Container>;
    } else {
        return null;
    }
}
