import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Profile from './components/Profile/Profile.jsx';
import Dialogs from './components/Dialogs/Dialogs.jsx';
import News from './components/News/News.jsx';
import Music from './components/Music/Music.jsx';
import Settings from './components/Settings/Settings.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




const App = (props) => {

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />

        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/Profile/*' element={<Profile postsData={props.postsData}/>} />
            <Route path='/Dialogs/*' element={<Dialogs dialogsData={props.dialogsData} messagesData={props.messagesData} />} />
            <Route path='/News/*' element={<News />} />
            <Route path='/Music/*' element={<Music />} />
            <Route path='/Settings/*' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
