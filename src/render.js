import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { addPost } from './redux/State.js';
import {updateNewPostText} from './redux/State.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
export let rerenderEntireTree = (state) => {
  
  root.render(
    <BrowserRouter>
      <App appState={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
    </BrowserRouter>
  );
  reportWebVitals();
}