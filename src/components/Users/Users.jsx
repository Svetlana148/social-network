import React from 'react';
import styles from './Users.module.css';
import axios from 'axios';
import userPhoto from '../../img/User.png';




class Users extends React.Component {
	// constructor(props){
	// 	super(props);
	// }
	
	componentDidMount(){
		axios.get("https://social-network.samuraijs.com/api/1.0/users").then (responce =>{
				this.props.setUsers(responce.data.items);
			});
	}

	render(){
		return <div>
		<button onClick={this.getUsers }>Get Users</button>
		{ 
		this.props.users.map(u=><div key={u.id}>
			<span>
				<div>
					<img src={u.photos.small !=null ? u.photos.small : userPhoto} className={styles.usersPhoto} alt="" />
				</div>
				<div>
					{u.followed ? 
					<button onClick={()=>{this.props.unfollow(u.id)}}>unfollow</button> : 
					<button onClick={()=>{this.props.follow(u.id)}}>follow</button>}
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
	}
	
};


export default Users;
