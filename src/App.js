import React, { Component } from 'react';
import './App.css';

import {Routes, Route} from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import News from './components/News/News.jsx';
import Music from './components/Music/Music.jsx';
import Settings from './components/Settings/Settings.jsx';

import DialogsContainer from './components/Dialogs/DialogsContainer.jsx';
import UsersContainer from './components/Users/UsersContainer.jsx';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login.jsx';
import {getAuthUserData} from './redux/auth-reducer.js';
// import {withRouter} from 'react-router-dom'; 
import {connect} from 'react-redux';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { compose } from "redux";
//import { store } from "./redux/redux-store.js";


class App extends Component {

  componentDidMount(){
    this.props.getAuthUserData();
    };

  render(){

    return (
        <div className='app-wrapper'>
          <HeaderContainer/>
          <Navbar/>


          <div className='app-wrapper-content'> 
            <Routes>  
              <Route path='/Login/*' element={<Login />} />          
              <Route path='/Profile/:userId?' element={<ProfileContainer />} />

              <Route path='/Dialogs/*' element={<DialogsContainer />} />

              <Route path='/Users/*' element={<UsersContainer />} />

              <Route path='/News/*' element={<News />} />
              <Route path='/Music/*' element={<Music />} />
              <Route path='/Settings/*' element={<Settings />} />
            </Routes>
          </div>
        </div>
    );
  }
}


// function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let params = useParams();

//     return (
//       <Component
//         {...props}
//         router={{ location, navigate, params }}
//       />
//     );
//   }

//   return ComponentWithRouterProp;
// }

// let mapStateToProps = (store)=>(
//   {store:store}
// );


export default connect(null, {getAuthUserData})(App);

