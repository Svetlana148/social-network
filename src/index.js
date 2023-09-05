import store from './redux/redux-store.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree1 = (store) => {

	root.render(
		<BrowserRouter>
			<App store={store} />
		</BrowserRouter>
	);
	reportWebVitals();
}


rerenderEntireTree1(store);


store.subscribe (() =>{

	rerenderEntireTree1(store);
});
