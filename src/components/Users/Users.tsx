import React, {FC, useEffect} from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';
import UserSearchForm from './UserSearchForm';
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';
import { AppDispatch } from '../../redux/redux-store';




//Типизируем Props-сы к-ты Users
type UsersPropsType ={
	//followingInProgress : Array<number>
	//follow : (userId : number)=>void 
	//unfollow : (userId : number)=>void 
}

// Users  : React.FC<PropsType>  or     Users  : FC<PropsType> & import React, {FC} from 'react';
export const Users : FC<UsersPropsType> = (props)=>{

	
	

	//Используем "useSelector( наш селектор)" для получения данных из "state"-а не через "props"-ы	
	const users = useSelector(getUsers)
	const totalUsersCount = useSelector(getTotalUsersCount)
	const pageSize = useSelector(getPageSize)
	const currentPage = useSelector(getCurrentPage)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingInProgress)




	//Используем "useDispatch( наша thunk/action)" для Dispatch-а в "state" не через "props"-ы----------------------------------------										
		
	//------ПРИВЕДЕНИЕ ТИПОВ-----------
	//const dispatch = useDispatch()
	const dispatch: AppDispatch  =  useDispatch()


	//Чтобы при загрузке получить начальнеый набор "User"-ов. 
	//Вместо "ComponentDidMount" использхуем "useEffect"
	useEffect(()=>{
		//Запрашиваем "User"-ов
		dispatch(requestUsers(currentPage, pageSize, filter))
	}, [currentPage, dispatch, filter, pageSize])



	const onPageChanged = (numberPage: number) => {
	//"requestUsers" - это Thunk-Creator( подвид  ActionCreator-а). Его нельзяя просто вызывать, только "dispatch"-ить
	dispatch(requestUsers(numberPage, pageSize, filter)); 
	}

	const onFilterChanged = (filter: FilterType) => {								
		//Вызывает ф-цию запроса"User"-ов и изменения "filter"-а
		dispatch(requestUsers(1, pageSize, filter)); 	//"currentPage" =1 если фильтр поменялся
	}

	const UI_follow = (userId: number) => {
		dispatch(follow(userId)); 	
	}

	const UI_unfollow = (userId: number) => {								
		dispatch(unfollow(userId)); 	
	}


	
	//------------------------------------------------------------------------------------------------------------------------

	return (
		<div>
			<UserSearchForm onFilterChanged = {onFilterChanged}/>
			{/* Вызываем компоненту с постраничным выводом объектов группой	по pageSize штук-------------------------------- */}
			<Paginator totalItemsCount={totalUsersCount} 
							pageSize={pageSize} 
							currentPage={currentPage}
							onPageChanged={onPageChanged}/>
				

			<div>

				{users.map(u => <User user={u}
											followingInProgress = {followingInProgress}
											key={u.id}
											follow={UI_follow}
											unfollow={UI_unfollow}
											/>	
					)
				}	
			</div>		
		</div>
	);
};
