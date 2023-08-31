import store from './redux/State.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree1 = (state) => {

	root.render(
		<BrowserRouter>
			<App appState={state} dispatch={store.dispatch.bind(store)} />
		</BrowserRouter>
	);
	reportWebVitals();
}


rerenderEntireTree1(store.getState());
store.subscribe (rerenderEntireTree1);
