import {rerenderEntireTree} from '../render.js';


let state = {

	profilePage:{
		postsData : [
		{ id: 1, message: 'Солнце', likesCount: '1' },
		{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
		{ id: 3, message: '12342345', likesCount: '78' }
		],
		newPostText : 'Hallo everybody'
	},


	dialogsPage:{
		dialogsData : [
			{ id: 1, name: "Ola" },
			{ id: 2, name: 'Masha' },
			{ id: 3, name: 'Katy' },
			{ id: 4, name: 'Lula' },
			{ id: 5, name: 'Berta' },
			{ id: 6, name: 'Boska' }
		],
		messagesData : [
		{id: 1, message: 'Hallo'},
		{id: 2, message: 'Tchudfg'},
		{id: 3, message: 'Gut'}
		]
	},
	sidebar:{
		frendsData : [
			{ id: 1, name: 'Lula' },
			{ id: 2, name: 'Berta' },
			{ id: 3, name: 'Boska' }
		]
	},

}

window.state = state;


export let addPost = ()=>{

	let newPost = {
		id: 4, 
		message: state.profilePage.newPostText, 
		likesCount: '0'
	};

	state.profilePage.postsData.push(newPost);
	state.profilePage.newPostText=('');
	rerenderEntireTree(state);
}

export let updateNewPostText = (newText)=>{

	state.profilePage.newPostText = newText;
	rerenderEntireTree(state);
}

export default state;



