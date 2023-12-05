import React from 'react';

//import s from './ProfileStatus.module.css';


class ProfileStatus extends React.Component {
	

	state = {
		editMode : false
	}

	activateEditMode = () =>{
		this.setState({
			editMode : true,
			status : this.props.status
		});
		//this.forceUpdate(); Перерисовать насильно
	}

	onStatusChange = (e) =>{
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

	componentDidUpdate (prevProps, prevState){
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