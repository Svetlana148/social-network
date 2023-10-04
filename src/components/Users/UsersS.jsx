import React from 'react';
import styles from './Users.module.css';
import axios from 'axios';
import userPhoto from '../../img/User.png';


let Users = (props) => {
	
	let getUsers = ()=>{
		//set startState
		if (props.users.length===0) {
			axios.get("https://social-network.samuraijs.com/api/1.0/users").then (responce =>{
				props.setUsers(responce.data.items);
			});
		}
	}
	



	return <div>
		<button onClick={getUsers }>Get Users</button>
		{ 
		props.users.map(u=><div key={u.id}>
			<span>
				<div>
					<img src={u.photos.small !=null ? u.photos.small : userPhoto} className={styles.usersPhoto} alt="" />
				</div>
				<div>
					{u.followed ? 
					<button onClick={()=>{props.unfollow(u.id)}}>unfollow</button> : 
					<button onClick={()=>{props.follow(u.id)}}>follow</button>}
				</div>
			</span>

			<span>
				<span>
					<div>{u.name}</div>
					<div>{u.status}</div>
				</span>
				<span>
					<div>{"u.location.country"}</div>
					<div>{"u.location.city"}</div>
				</span>
			</span>
		
		

		

		</div>
		)

		}

	</div>
};
export default Users;
