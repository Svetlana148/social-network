//Отрисовка 1 "Post"-а
import React from 'react';
import s from "./Post.module.css";
import { PostType } from '../../../../types/types';

type PropsType = {
	message: string
	likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
	return (
		<div className={s.item}>
			<img src="https://img.freepik.com/free-photo/portrait-of-shocked-brunet-european-man-stares-surprisingly-at-camera-keeps-eyes-widely-opened-wears-round-spectacles-and-sweater-sees-something-breathtaking-isolated-over-beige-studio-background_273609-56718.jpg?size=626&ext=jpg&ga=GA1.2.453830856.1690201513&semt=sph" alt="" />
			{props.message}
			<div>
				likes 
				{props.likesCount}
			</div>
		</div >
	);

}
export default Post;