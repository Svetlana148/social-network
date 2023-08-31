import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
// import { postsElement } from 'module'



const MyPosts = (props) => {

	let postsElement = props.postsData.map(p => 
							<Post message={p.message} likesCount={p.likesCount} />);


	// ref----------------------------------------------				
	let newPostElement = React.createRef();

	// onChange-----------------------------------------
	let onPostChange = ()=>{
		let text =  newPostElement.current.value;
		props.dispatch({type:'UPDATE-NEW-POST', newText:text});
	} 
// addPost-----------------------------------------
	let addPost = ()=>{
		props.dispatch({type:'ADD-POST'});
	}

	return (
		<div className={s.myPosts}>
			<h3>My posts:</h3>
			<div>
				<div>
					<textarea onChange = {onPostChange} ref={newPostElement} value={props.newPostText}/>
				</div>

				<div>
					<button onClick={addPost}>Add post</button>


					<button>Remove</button>
				</div>

			</div>

			<div className={s.posts}>

				{postsElement}
				
			</div>

		</div>
	);

}
export default MyPosts;