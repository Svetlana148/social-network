import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from 'redux'; 
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import {thunk } from 'redux-thunk'; // Отличие от видео
import { reducer as formReducer } from 'redux-form';


// --let appStateObject = {
// --	profilePage : profileReducer,
// --	dialogsPage : dialogsReducer,
// --	sidebar : sidebarReducer,
// --	usersPage : usersReducer,
// --	auth : authReducer,
// --	form : formReducer,
// --	app : appReducer,
// --}

let rootReducer = combineReducers({
	profilePage : profileReducer,
	dialogsPage : dialogsReducer,
	sidebar : sidebarReducer,
	usersPage : usersReducer,
	auth : authReducer,
	form : formReducer,
	app : appReducer,
});

type RootReducerType = typeof rootReducer; 				// typeof положит В RootReducerType типизированные подпункты(profilePage, ...) глобальногоState-а(AppState)
export type AppStateType = ReturnType<RootReducerType> //ReturnType Определит что лежит в <RootReducerType> и вернет его в AppStateType
//--type AppStateType = typeof appStateObject;
let state : AppStateType; 										// В "state:" теперь лежит полностью типизированный state



// Общий ТИП  "InferActionsTypes" для всех reducer-ов ----------------------------------------------
// "T extends(...)" - Если Т это "(...)"
type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U : never // "infer" - определяет тип "U" - AC-тора 
export type InferActionsTypes<T extends {[key:string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>> //"<T extends..." - ограничение для передаваемого "Т"




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