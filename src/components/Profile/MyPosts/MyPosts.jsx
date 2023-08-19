import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';



let postsData = [
	{ id: 1, message: 'Mope', likesCount: '1' },
	{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
	{ id: 3, message: '12342345', likesCount: '78' },
]
let postsElement = postsData.map(p => <Post message={p.message} likesCount={p.likesCount} />);





const MyPosts = () => {
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
				{/* <Post message={postsData[0].message} likesCount={postData[0].likesCount} /> */}
				
			</div>

		</div>
	);

}
export default MyPosts;