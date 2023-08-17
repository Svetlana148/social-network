import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';



let postData = [
	{ id: 1, message: 'Mope', likesCount: '1' },
	{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
	{ id: 3, message: '12342345', likesCount: '78' },
]



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
				{/* <Post message = 'Mope' likesCount = '2'/> */}
				<Post message={postData[0].message} likesCount={postData[0].likesCount} />
				<Post message={postData[1].message} likesCount={postData[1].likesCount} />
				<Post message={postData[2].message} likesCount={postData[2].likesCount} />
			</div>

		</div>
	);

}
export default MyPosts;