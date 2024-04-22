// import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import JSApp from './App';
import reportWebVitals from './reportWebVitals';

//                            ReactDOM.render(<JSApp/>, document.getElementById('root'));   
//Устаревшее и Не проходит

	

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLDivElement
);
root.render(<JSApp />);



reportWebVitals();




