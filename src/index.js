import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Login from './login.js';

function App({}) {
    const [text, setText] = useState('Hello, world!');

    const click = (e) => {
        setText(text => text + ' again');
    };

    return (
        <div onClick={click}>
            {text}
            <Login />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
