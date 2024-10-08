import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import store, { AppStateType } from './redux/redux-store';


import { initializeApp } from "./redux/app-reducer";
import './App.css';
// import Navbar from './components/Navbar/Navbar';
// import HeaderContainer from './components/Header/HeaderContainer';
import Preloader from './components/common/Preloader/Preloader';
import AppAntD from './AppLayout';




// Контейнеры : (4 JSApp (3 AppContainer (2 App(1 AppAntD))))
// 2 AppContainer снабжает (1 App)) чем: "initialize"   и "initializeApp"
// 3 JSApp снабжает (2 AppContainer) чем: "BrowserRouter"-ом и "store"-ом 




// lazy - Сборщик НЕ собирает эту компоненту СРАЗУ в общий bandl, а только когда эту к-ту надо будет отрисовывать
// ее запросят снова с сервера. Т.о. загрузочный файл меньше и при лож-е загруж-ся быстрее
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersPage = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));
const Music = React.lazy(() => import('./components/Music/Music'));
const News = React.lazy(() => import('./components/News/News'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));



//Типизируем props для "App"
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}






//--------2-----------------------------------------
class App extends Component<MapPropsType & DispatchPropsType>{

  // для отлова ошибки, см. ниже
  // reasen-причина ошибки, promise- какой из них не выполнился
  catchAllUnhandledErrors = (e: PromiseRejectionEvent): any => {
    alert("Some error occurred")
  }

  //Запрос у сервера начальных данных-----------------------------------------

  // componentDidMount срабатывает только 1 раз, когда к-та вмонтируется
  componentDidMount() {
    this.props.initializeApp();

    // Перехватываем все непрехваченные ранее promis-ы
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  };

  //Если есть addEventListener, то где-то надо делать removeEventListener для него
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  };

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <AppAntD />
    );
  }
}



const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});




//--------3-----------------------------------------
let AppContainer = connect(mapStateToProps, { initializeApp })(App);



//--------4-----------------------------------------
const JSApp: React.FC = () => {
  return (
    // BrowserRouter обеспечивает Маршрутизацию. когда в проекте обрабатываются на сервере динамические запросы
    // HashRouter используйте когда у вас статический веб сайт
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* Provider кладет store в глобальный CONTEXT, чтобы все имели к нему доступ */}
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
};

export default JSApp;

