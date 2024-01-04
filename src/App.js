import React, { Component } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import store from './redux/redux-store.js';


import { initializeApp } from "./redux/app-reducer.js";
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import HeaderContainer from './components/Header/HeaderContainer';
import Preloader from './components/common/preloader/Preloader.jsx';



// import News from './components/News/News.jsx';
// import Music from './components/Music/Music.jsx';
// import Settings from './components/Settings/Settings.jsx';
// import DialogsContainer from './components/Dialogs/DialogsContainer.jsx';
// import UsersContainer from './components/Users/UsersContainer.jsx';
// import ProfileContainer from './components/Profile/ProfileContainer';
// import Login from './components/Login/Login.jsx';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.jsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer.jsx'));
const Login  = React.lazy(() => import('./components/Login/Login.jsx'));
const Music = React.lazy(() => import('./components/Music/Music.jsx'));
const News = React.lazy(() => import('./components/News/News.jsx'));
const Settings = React.lazy(() => import('./components/Settings/Settings.jsx'));




class App extends Component {

  //Запрос у сервера начальных данных-----------------------------------------
  componentDidMount(){
    this.props.initializeApp();
    };

  render(){
    if (!this.props.initialized){
      return <Preloader />
    }



    return (
        <div className='app-wrapper'>
          <HeaderContainer/>
          <Navbar/>


          <div className='app-wrapper-content'> 



          <React.Suspense fallback={<div><Preloader /></div>}>
						<Routes basename = {process.env.PUBLIC_URL}>
							{/* <Route path="/profile/:userID" element={<ProfileContainer />} /> */}
							<Route path='/Profile/:userId?' element={<ProfileContainer />} />
							<Route path='/Dialogs/*' element={<DialogsContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/music" element={<Music />} />
              <Route path="/news" element={<News />} />
              <Route path="/settings" element={<Settings />} />

							{/* <Route path="/news" element={<News />} />
							<Route path="/music" element={<Music />} />
							<Route path="/users" element={<UsersContainer />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/login" element={<Login />} /> */}
						</Routes>
					</React.Suspense>



            {/* <Routes>  
              <Route path='/Login/*' element={<Login />} />          
              <Route path='/Profile/:userId?' element={<ProfileContainer />} />

              <Route path='/Dialogs/*' element={<DialogsContainer />} />

              <Route path='/Users/*' element={<UsersContainer />} />

              <Route path='/News/*' element={<News />} />
              <Route path='/Music/*' element={<Music />} />
              <Route path='/Settings/*' element={<Settings />} />
            </Routes> */}
          </div>
        </div>
    );
  }
}


const mapStateToProps = (state) => ({
  initialized : state.app.initialized
});


let AppContainer = connect(mapStateToProps, {initializeApp})(App);

const JSApp = (props) => {
  return(
    <BrowserRouter>
        <Provider store = {store}>
          <AppContainer />
        </Provider>
    </BrowserRouter>
  )
};

export default JSApp;

