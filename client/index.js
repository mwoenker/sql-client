import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Login from './login.js';
import {LoginContextProvider, useLoginContext} from './login-context.js';
import TableList from './table-list.js';
import ResultsTable from './result-table.js';
import QueryForm from './query-form.js';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

const Layout = styled.div({
    display: 'flex',
    height: '100vh',
});
const SidePanel = styled.div({
    flex: '0 0 300px',
    background: '#ccc',
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5em 0 0.5em 0p.5em',
});
const MainPanel = styled.div({
    flex: '1 1 auto',
    marginLeft: '0.5em',
    position: 'relative',
    width: 'calc(100vh - 300px)',
});
const QueryPane = styled.div({
    flex: '1 auto',
    height: '35%',
    position: 'relative',
});
const ResultPane = styled.div({
    borderTop: '2px solid #888',
    flex: '1 1 auto',
    height: '65%',
    boxSizing: 'border-box',
    position: 'relative',
});
const SidePanelBottom = styled.div({
    margin: '0.5em 0.5em 0.5em auto',
});

function App({}) {
    const {state, login, logout, schemas, queryResult} = useLoginContext();

    if ('loggedIn' === state) {
        return (
            <Layout>
                <SidePanel>
                    <TableList schemas={schemas} />
                    <SidePanelBottom>
                        <button onClick={logout}>Log out</button>
                    </SidePanelBottom>
                </SidePanel>
                <MainPanel>
                    <QueryPane>
                        <QueryForm />
                    </QueryPane>
                    <ResultPane>
                        <ResultsTable {...queryResult} />
                    </ResultPane>
                </MainPanel>
            </Layout>
        );
    } else {
        return <Login />;
    }
}

function AppContainer({}) {
    return (
        <LoginContextProvider>
            <App />
        </LoginContextProvider>
    );
}

ReactDOM.render(<AppContainer />, document.getElementById('app'));
