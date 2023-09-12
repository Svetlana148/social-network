import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

let store = {

	_state: {

		profilePage: {
			postsData: [
				{ id: 1, message: 'Солнце', likesCount: '1' },
				{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
				{ id: 3, message: '12342345', likesCount: '78' }
			],
			// what is changing
			newPostText: 'Hallo everybody'
		},

		dialogsPage: {
			dialogsData: [
				{ id: 1, name: "Ola" },
				{ id: 2, name: 'Masha' },
				{ id: 3, name: 'Katy' },
				{ id: 4, name: 'Lula' },
				{ id: 5, name: 'Berta' },
				{ id: 6, name: 'Boska' }
			],
			messagesData: [
				{ id: 1, message: 'Hallo' },
				{ id: 2, message: 'Tchudfg' },
				{ id: 3, message: 'Gut' }
			],
			// what is changing
			newMessageText: `You message`
		},
		
		sidebar: {
			frendsData: [
				{ id: 1, name: 'Lula' },
				{ id: 2, name: 'Berta' },
				{ id: 3, name: 'Boska' }
			]
		},

	},
	_callSubscriber() { },



	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},

	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._state.settingsPage = sidebarReducer(this._state.settingsPage, action);

		this._callSubscriber(this._state);
	},
}


export default store;
//window.store = store ;



