//Нижняя половина станицы "Profile" с формой для ввода нового поста и внизу старые посты
import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostForm from './AddPostForm/AddPostForm';
import { PostType } from '../../../types/types';





type PropsType = {  //Для  "MyPosts"
	addPost: (newPostText: string) => void
	postsData : Array<PostType>
}



const MyPosts : React.FC<PropsType> = (props => {

	let postsElement = props.postsData.map(p => 
							<Post key ={p.id} message={p.message} likesCount={p.likesCount} />);


	return (
		<div className={s.myPosts}>
			<h3>My posts:</h3>
			<AddPostForm addPost={props.addPost}/>
			
			<div className={s.posts}>
				{postsElement}
			</div>
		</div>
	);
});


//memo это функция высшего порядка (higher-order component, HOC), которая оборачивает компонент и перерисовывает его только когда изменились его props-ы
const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo;