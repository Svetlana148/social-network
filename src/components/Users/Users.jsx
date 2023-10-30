import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../img/User.png';
import {NavLink} from  'react-router-dom';
// import axios from 'axios';
// import {usersAPI} from '../api/api.js';




let Users = (props)=>{

	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	let pages = [];
	for (let i=1; i<= pagesCount; i++) {
		pages.push(i);
	};
	
return (
		<div>
				
			<div>
				{pages.map( p => {
					return(
						
					<span className={props.currentPage===p && styles.selectedPage}
							onClick={(e)=>{props.onPageChanged(p)}}>
						{p}
					</span>
					)
				})}
			</div>

			<div>
				{props.users.map(u => <div key={u.id}>
						<span>
							<div>
								<NavLink to = {'/profile/' +u.id}>
									<img src={u.photos.small !=null ? u.photos.small : userPhoto} className={styles.usersPhoto} alt="" />
								</NavLink>
							</div>
							<div>

{/* ------------------------------------------------------------------------------- */}

								{u.followed 
								
								? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={()=>{props.unfollow(u.id);}
									// props.toggleFollowingProgress (true, u.id);
									// usersAPI.follow (u.id)
									// 					// axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, 
									// 					// 	{withCredentials : true,
									// 					// 	header : {"API-KEY" : "495ccbaa-f1de-49f2-aee6-bb202e0b4fca"}
									// 					// 	})
									// 	.then (responce =>{
									// 		if (responce.data.resultCode === 0) {props.unfollow(u.id)}
									// 		props.toggleFollowingProgress (false, u.id)
									// 	});
									

								}>unfollow</button> 
								
								
								: <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={()=>{props.follow(u.id);}
			// 						props.toggleFollowingProgress (true, u.id);
			// 						usersAPI.unfollow (u.id)
			// 					// 						axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
			// 					// 							{withCredentials : true,
			// 					// 							header : {"API-KEY" : "495ccbaa-f1de-49f2-aee6-bb202e0b4fca"}
			// 					// 							})
			// 							.then (responce =>{
			// 								if (responce.data.resultCode === 0) {props.follow(u.id)}
			// 							props.toggleFollowingProgress (false, u.id)
			// });
			
									}>follow</button>}









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
				};
			</div>

		</div>
	);
};


export default Users;
