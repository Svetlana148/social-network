// import profileReducer from '../redux/profile-reducer';
// import ReactDOM from '../components/api/api';
// import App from '../App';
// import React from 'react';
import  profileReducer, {addPostActionCreator} from './profile-reducer';
import  profileReducer, {addPostActionCreator} from './profile-reducer';


it('new post should be added', () => {
	//1. test data--------------------------------
	let action = addPostActionCreator("A lot of info");
	let state = {
		postsData: [
			{ id: 1, message: 'Солнце', likesCount: '1' },
			{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
			{ id: 3, message: '12342345', likesCount: '78' }
		],
	};
	//2. action ---------------------------------------------
	let newState = profileReducer(state, action);
	//3. expectation ---------------------------------------------
	expect (newState.postsData.length ).toBe(4);
});