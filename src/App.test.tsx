
import React from 'react';
import ReactDOM from 'react-dom';
import JSApp from './App';


test('renders without crashing', () => {

	//todo переписать "ReactDOM.render "
	const div = document.createElement("div");
	ReactDOM.render(<JSApp />, div);
	ReactDOM.unmountComponentAtNode(div);
});


