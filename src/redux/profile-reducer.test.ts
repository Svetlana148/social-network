import  profileReducer, {actions} from './profile-reducer';
// import React from 'react';
import  {ProfileType} from '../types/types';


let state = {
	postsData: [
		{ id: 1, message: 'Солнце', likesCount: 1 },
		{ id: 2, message: 'Hjiolpoiu', likesCount: 23 },
		{ id: 3, message: '12342345', likesCount: 78 }
	],
	profile : null,
	status : "",
	newPostText: "",
};


it('length of posts should be incremented', () =>{
	// 1. test data--------------------------------
	let action = actions.addPostActionCreator("A lot of info");
	
	// 2. action ---------------------------------------------
	let newState = profileReducer(state, action);

	// 3. expectation ---------------------------------------------
	expect (newState.postsData.length ).toBe(4);
});




it('new post should be added', () => {
	// 1. test data--------------------------------
	let action = actions.addPostActionCreator("A lot of info");

	
	// 2. action ---------------------------------------------
	let newState = profileReducer(state, action);
	// 3. expectation ---------------------------------------------
	expect (newState.postsData.length ).toBe(4);
});