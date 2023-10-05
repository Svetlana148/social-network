import React from 'react';
import styles from './Users.module.css';
import axios from 'axios';
import userPhoto from '../../img/User.png';




class Users extends React.Component {
	// constructor(props){
	// 	super(props);
	// }

	onPageChanged = (numberPage)=>{
		this.props.setCurrentPage(numberPage);

		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${numberPage}&count=${this.props.pageSize}`).then (responce =>{
				this.props.setUsers(responce.data.items);
			});
	}

	componentDidMount(){
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).
			then (responce =>{
			this.props.setUsers(responce.data.items);
			debugger
			this.props.setTotalUsersCount(responce.data.totalCount);

			});
	}

	


	render(){
		let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
		let pages = [];
		for (let i=1; i<= pagesCount; i++) {
			pages.push(i);
		};




		return <div>
			

			<div>
				{pages.map( p => {
					return(
						
					<span className={this.props.currentPage===p && styles.selectedPage}
							onClick={(e)=>{this.onPageChanged(p)}}>
						{p}
					</span>
					)
				})}
			</div>


			

		{/* <button onClick={this.getUsers }>Get Users</button> */}


		
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
