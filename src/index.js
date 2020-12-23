import React, {useState, useReducer, useEffect, useLayoutEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

function App({}) {
    const [text, setText] = useState('Hello, world!');

    const click = (e) => {
        setText(text => text + ' again');
    };

    return <div onClick={click}>{text}</div>;
}

ReactDOM.render(<App />, document.getElementById('app'));
