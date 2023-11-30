import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'; 
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import thunkMiddlewarer from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';



let reducers = combineReducers({
	profilePage : profileReducer,
	dialogsPage : dialogsReducer,
	sidebar : sidebarReducer,
	usersPage : usersReducer,
	auth : authReducer,
	form : formReducer,
	app : appReducer,
});

let store=createStore(reducers, applyMiddleware(thunkMiddlewarer)); //Промежуточный слой внедряем в store


window.Storage = store;
export default store;