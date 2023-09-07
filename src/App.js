import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Profile from './components/Profile/Profile.jsx';
import DialogsContainer from './components/Dialogs/DialogsContainer.jsx';
import News from './components/News/News.jsx';
import Music from './components/Music/Music.jsx';
import Settings from './components/Settings/Settings.jsx';
import {Routes, Route} from 'react-router-dom';



const App = (props) => {

  return (
      <div className='app-wrapper'>
        <Header />
        {/* <Navbar frendsData = {props.store.getState().sidebar.frendsData}/> */}

        <div className='app-wrapper-content'> 
          <Routes>
            <Route path='/Profile/*' element=
                                    {<Profile store={props.store}/>} />

            <Route path='/Dialogs/*' element={<DialogsContainer store={props.store}/>} />

            <Route path='/News/*' element={<News />} />
            <Route path='/Music/*' element={<Music />} />
            <Route path='/Settings/*' element={<Settings />} />
          </Routes>
        </div>
      </div>
  );
}


export default App;
