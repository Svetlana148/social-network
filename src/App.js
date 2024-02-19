import React, { Component } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import store from './redux/redux-store.js';


import { initializeApp } from "./redux/app-reducer.tsx";
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import HeaderContainer from './components/Header/HeaderContainer';
import Preloader from './components/common/preloader/Preloader.jsx';



// lazy - Сборщик НЕ собирает эту компоненту СРАЗУ в общий bandl, а только когда эту к-ту надо будет отрисовывать
// ее запросят снова с сервера. Т.о. загрузочный файл меньше и при лож-е загруж-ся быстрее
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.jsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer.jsx'));
const Login  = React.lazy(() => import('./components/Login/Login.jsx'));
const Music = React.lazy(() => import('./components/Music/Music.jsx'));
const News = React.lazy(() => import('./components/News/News.jsx'));
const Settings = React.lazy(() => import('./components/Settings/Settings.jsx'));




class App extends Component {

  // для отлова ошибки, см. ниже
  // reasen-причина ошибки, promise- какой из них не выполнился
  catchAllUnhandledErrors =(reasen, promise) =>{

  }

  //Запрос у сервера начальных данных-----------------------------------------

  // componentDidMount срабатывает только 1 раз, когда к-та вмонтируется
  componentDidMount(){
    this.props.initializeApp();

    // Перехватываем все непрехваченные ранее promis-ы
    window.addEventListener("unhandledrwjection", this.catchAllUnhandledErrors);
    };

    //Если есто addEventListener, то где-то надо делать removeEventListener для него
    componentDWillUnmount(){
      window.removeEventListener("unhandledrwjection", this.catchAllUnhandledErrors);
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
						<Routes >
              {/* Есть Route exact тут ищется точное совпадение и дальше не идем */}
							<Route path='/Profile/:userId?' element={<ProfileContainer />} />
							<Route path='/Dialogs/*' element={<DialogsContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/music" element={<Music />} />
              <Route path="/news" element={<News />} />
              <Route path="/settings" element={<Settings />} />

						</Routes>
					</React.Suspense>
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
    // BrowserRouter обеспечивает Маршрутизацию. когда в проекте обрабатываются на сервере динамические запросы
    // HashRouter используйте когда у вас статический веб сайт
    <BrowserRouter >
        {/* Provider кладет store в глобальный CONTEXT, чтобы все  */}
        <Provider store = {store}>
          <AppContainer />
        </Provider>
    </BrowserRouter>
  )
};

export default JSApp;

