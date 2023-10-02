const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'setUsers';


let initialState = {
	users: [
		// { id: 1, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Grand_Duchess_Olga_Alexandrovna.jpg/330px-Grand_Duchess_Olga_Alexandrovna.jpg', 
		// 	followed: false, userName: 'Ola', status: 'Chef', location: {country: 'German', sity : 'Munich'} },
		// { id: 2, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Olga_of_Greece_VI_restoration.jpg/330px-Olga_of_Greece_VI_restoration.jpg', 
		// 	followed: true, userName: 'Vala', status: 'Chef', location: {country: 'German', sity : 'Berlin'} },
		// { id: 3, photoUrl: 'https://images.fineartamerica.com/images-medium-large-5/1-olga-constantinovna-1851-1926-granger.jpg', 
		// 	followed: false, userName: 'Gala', status: 'Chef', location: {country: 'German', sity : 'Koeln'} },
	],
	// what is changing
	//newusers: { id: 4, followed: false, userName: 'Zara', status: 'Chef', location: {country: 'Fidji', sity : 'Gaja'} },
};





const usersReducer = (state = initialState, action)=>{
	switch(action.type){

		case FOLLOW:
		
			let result = {
			...state,
			//users : [...state.users], its the same as bellow
			users : state.users.map( u=>
				{
					if (u.id===action.userId) {
						return{...u, followed : true}
					};
					return(u);
				})			
			}

			return result;


		case UNFOLLOW:
		return {
		...state,
		users : state.users.map( u=>
			{if (u.id===action.userId) {
				return{...u, followed : false}
				};
				return(u);
			})			
		};



		case SET_USERS:
	
			return {
				...state,
				users : [...state.users, ...action.users]
			};

		default:
			return(state);
	}
}; 


export default usersReducer;

// ActionCreator  Post-----------------------------------------

export const followAC = (userId)=>({type : FOLLOW, userId});


export const unfollowAC = (userId)=>{
	return {type : UNFOLLOW, userId};
};

export const setUsersAC = (users)=>({type : SET_USERS, users});