import React, {ChangeEvent} from 'react';
//import s from './ProfileStatus.module.css';



//Типизируем к-ту ProfileStatus----------------------
type PropsType = { // какие Props-ы к-та принимает
	status : string
	updateStatus : (newStatus : string) => void
}
type StateType = { // какой локальный State к-та использует 
	editMode : boolean
	status : string
}

// status из пропсов должен перейти в local state
class ProfileStatus extends React.Component<PropsType, StateType> {
	
	state = {
		editMode : false,
		status : this.props.status
	}

	activateEditMode = () =>{
		this.setState({
			editMode : true,
			status : this.props.status
		});
		//this.forceUpdate(); Перерисовать насильно
	}

	//для типизации "e" сначала пишем e : number, а потом из сообщения об ошибке 
	//копируем, что должно быть и import-ируем ChangeEvent
	onStatusChange = (e : ChangeEvent<HTMLInputElement>) =>{
		this.setState({
			status : e.currentTarget.value
		})
	}

	deactivateEditMode = () =>{
		this.setState({
			editMode : false			
		});
		this.props.updateStatus(this.state.status);
	}

	componentDidUpdate (prevProps : PropsType, prevState : StateType){
		if (prevProps.status !== this.props.status){
			this.setState({
				status : this.props.status
			})
		}
	}


	
	render(){
		console.log("render")
		return (
			<div> 
				{!this.state.editMode &&
					<div>
						
						<span onDoubleClick={this.activateEditMode}>{this.props.status || "----------"}</span>
					</div>			
				}


				{this.state.editMode &&
					<div>
						<input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}  value={this.state.status} />
					</div>			
				}

			</div>
		); 
	}
}
export default ProfileStatus;