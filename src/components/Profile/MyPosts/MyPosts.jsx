import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator} from '../../../utils/Validators/validators';

//import { Form } from 'react-router-dom';
// import {updateNewPostText} from './MyPostsContainer';



const MyPosts = (props) => {

	let postsElement = props.postsData.map(p => 
							<Post message={p.message} likesCount={p.likesCount} />);


	// ref----------------------------------------------				
	let newPostElement = React.createRef();

	// onChange-----------------------------------------
	let onPostChange = ()=>{

		let text =  newPostElement.current.value;
		props.updateNewPostText(text);
	} 
// addPost----Redux-Form-------------------------------------
	let addPost = (values)=>{
		props.addPost(values.newPostText);
	}
// -----------------------------------------
// Redux-Form---------------------------------------------
// let addNewPost=(values)=>{
// 	props.addNewPost(values.addPostText);
// };



	return (
		<div className={s.myPosts}>
			<h3>My posts:</h3>
			<AddNewPostForm onSubmit={addPost}/>
			

			{/* <div>
				<div>
					<textarea onChange = {onPostChange} ref={newPostElement} value={props.newPostText}/>
				</div>
				<div>
					<button onClick={addPost}>Add post</button>
					<button>Remove</button>
				</div>
			</div> */}

			<div className={s.posts}>
				{postsElement}
			</div>

		</div>
	);
}





// ---Redux-Form-----------------------------------------------------------------------
const maxLength10 = maxLengthCreator(10);


const AddNewPost = (props)=>{
	return(
		<form onSubmit ={props.handleSubmit}>
				<div>
					<Field component={"textarea"}
						name={"newPostText"}
						validate={[ required, maxLength10]}
						// placeholder={"Enter your post"}
						/>
				</div>

				<div>
					<button>Add post</button>


					<button>Remove</button>
				</div>

			</form>
	)
}

const AddNewPostForm = reduxForm({
	form:"ProfileNewPostText"
})(AddNewPost)



export default MyPosts;