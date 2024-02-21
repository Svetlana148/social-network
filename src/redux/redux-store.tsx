import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from 'redux'; 
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import {thunk } from 'redux-thunk'; // Отличие от видео
import { reducer as formReducer } from 'redux-form';



let rootReducer = combineReducers({
	profilePage : profileReducer,
	dialogsPage : dialogsReducer,
	sidebar : sidebarReducer,
	usersPage : usersReducer,
	auth : authReducer,
	form : formReducer,
	app : appReducer,
});

type RootReducerType = typeof rootReducer; 
// typeof положит В RootReducerType типизированный подпункты(profilePage, ...) глобальногоState-а(AppState)
export type AppStateType = ReturnType<RootReducerType> //ReturnType Определит что лежит в <RootReducerType> и вернет его в AppStateType
let state : AppStateType; // В "state:" теперь лежит полностью типизированный state


// For Redux Dev Tools----------------------------------------------
//внедряем в store Промежуточный слой    thunkMiddleware----------------
//строка, после этого знака будет игнорироваться ts-компилятором
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)
));
// ----------------------------------------------

// let store=createStore(reducers, applyMiddleware(thunk)); //Промежуточный слой внедряем в store

//строка, после этого знака будет игнорироваться ts-компилятором
//@ts-ignore
window.Storage = store;
export default store;