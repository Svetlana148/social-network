import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Profile from './components/Profile/Profile.jsx';
import Dialogs from './components/Dialogs/Dialogs.jsx';
import News from './components/News/News.jsx';
import Music from './components/Music/Music.jsx';
import Settings from './components/Settings/Settings.jsx';
import {Routes, Route} from 'react-router-dom';



const App = (props) => {

  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar frendsData = {props.appState.frendsData}/>

        <div className='app-wrapper-content'> 
          <Routes>
            <Route path='/Profile/*' element=
                              {<Profile profilePage={props.appState.profilePage}
                              addPost={props.addPost}
                              updateNewPostText={props.updateNewPostText}/>} />
            <Route path='/Dialogs/*' element={<Dialogs Data={props.appState.dialogsPage}/>} />

            <Route path='/News/*' element={<News />} />
            <Route path='/Music/*' element={<Music />} />
            <Route path='/Settings/*' element={<Settings />} />
          </Routes>
        </div>
      </div>
  );
}


export default App;
