import { updateNewMessageTextActionCreator, addMessageActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect.js";
import { compose } from "redux";





// -----------------------------------------------------------------------------------------------------------
let mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage,
	}
}
let mapDispatchToProps = (dispatch) => {
	return {
		// updateNewMessageText : (text)=>{
		// 	let action = updateNewMessageTextActionCreator(text);
		// 	dispatch(action);
		// },

		addMessage: (newMessageText) => {
			dispatch(addMessageActionCreator(newMessageText));
		}
	}
}

// hoc---------------------------------------------------

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);
