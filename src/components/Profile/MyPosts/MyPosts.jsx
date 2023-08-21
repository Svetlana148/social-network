import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
// import { postsElement } from 'module'



const MyPosts = (props) => {
	let postsElement = props.postsData.map(p => <Post message={p.message} likesCount={p.likesCount} />);
	debugger
	return (
		<div className={s.myPosts}>
			<h3>My posts:</h3>
			<div>
				<div>
					<textarea></textarea>
				</div>

				<div>
					<button>Add post</button>
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