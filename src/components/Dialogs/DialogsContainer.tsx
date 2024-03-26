import { actions } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect.js";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";


// -----------------------------------------------------------------------------------------------------------
let mapStateToProps = (state:AppStateType) => {
	return {
		dialogsPage: state.dialogsPage,
	}
}
// let mapDispatchToProps = (dispatch) => {
// 	return {
// 		addMessage: (newMessageText) => {
// 			dispatch(actions.addMessageActionCreator(newMessageText));
// 		}
// 	}
// }

// hoc---------------------------------------------------
// compose применяет к к-те последовательно разные HOC (High_Order_Component)
// HOC - ф-ция, кот. принимает 1 к-ту, а возвращает контейнерную к-ту над входящей, стобы дать первой к-те какие-то данные

export default compose(
	connect(mapStateToProps, {...actions}),
	withAuthRedirect			// Если не залогинены, то ПЕРЕНАПРАВЛЯЕМ на Login. "withAuthRedirect"-HOC

)(Dialogs);
