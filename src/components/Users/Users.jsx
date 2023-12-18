import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../img/User.png';
import {NavLink} from  'react-router-dom';
import Paginator from '../common/Paginator/Paginator.js';
import {usersAPI} from '../api/api.js';




let Users = (props)=>{

return (
		<div>
				
			<Paginator totalUsersCount={props.totalUsersCount} 
							pageSize={props.pageSize} currentPage={props.currentPage}
							onPageChanged={props.onPageChanged}/>
				

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
								
								? <button disabled={props.followingInProgress.some(id => id === u.id)} 
												onClick={()=>{props.unfollow(u.id);
														props.toggleFollowingProgress (true, u.id);
									usersAPI.follow (u.id)
																
								}}
								>unfollow</button> 
								
								


								: <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={()=>{props.follow(u.id);
									props.toggleFollowingProgress (true, u.id);
									usersAPI.unfollow (u.id)
			
									}}
									>follow</button>
								}


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
