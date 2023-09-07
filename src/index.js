import store from './redux/redux-store.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree1 = (store) => {

	root.render(
		<BrowserRouter>
			<Provider store = {store}>
				<App/>
			</Provider>
		</BrowserRouter>
	);
	reportWebVitals();
}


rerenderEntireTree1(store);


store.subscribe (() =>{

	rerenderEntireTree1(store);
});
