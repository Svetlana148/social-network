import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from 'redux'; 
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import {thunk } from 'redux-thunk'; // Отличие от видео
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




// For Redux Dev Tools----------------------------------------------
//Промежуточный слой внедряем в store   thunkMiddleware----------------
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)
));
// ----------------------------------------------

// let store=createStore(reducers, applyMiddleware(thunk)); //Промежуточный слой внедряем в store


window.Storage = store;
export default store;