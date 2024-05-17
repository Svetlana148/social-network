import React, { FC, useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';
import UserSearchForm from './UserSearchForm';
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';
import { AppDispatch } from '../../redux/redux-store';
import { useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';




//Типизируем Props-сы к-ты Users
type UsersPropsType = {
	//followingInProgress : Array<number>
	//follow : (userId : number)=>void 
	//unfollow : (userId : number)=>void 
}

// Users  : React.FC<PropsType>  or     Users  : FC<PropsType> & import React, {FC} from 'react';
export const Users: FC<UsersPropsType> = (props) => {




	//Используем "useSelector( наш селектор)" для получения данных из "state"-а не через "props"-ы	
	const users = useSelector(getUsers)
	const totalUsersCount = useSelector(getTotalUsersCount)
	const pageSize = useSelector(getPageSize)
	const currentPage = useSelector(getCurrentPage)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingInProgress)




	//Используем "useDispatch( наша thunk/action)" для Dispatch-а в "state" не через "props"-ы----------------------------------------										

	//------ПРИВЕДЕНИЕ ТИПОВ для "UseDispatch"-а из-за изменений в Redux-е--------------------
	//const dispatch = useDispatch() так было
	const dispatch: AppDispatch = useDispatch()



	useEffect(() => {
		//При первой загрузке берем данные из "URL"-а 
		let term=searchParams.get('term');
		let friend=searchParams.get('friend');
		let page=searchParams.get('page');

		let actualPage = currentPage
      let actualFilter = filter

      if (!!page) actualPage = Number(page)


      if (!!term) actualFilter = {...actualFilter, term: term as string}

      switch(friend) {
            case "null":
               actualFilter = {...actualFilter, friend: null}
               break;
            case "true":
               actualFilter = {...actualFilter, friend: true}
               break;
            case "false":
               actualFilter = {...actualFilter, friend: false}
               break;
      }
		
		//Запрашиваем "User"-ов
		dispatch(requestUsers(actualPage, pageSize, actualFilter))
	}, [])


	let navigate = useNavigate();
	// let params = useParams(); //Создает Объект из "URL"-а
	//Делаем синхронизацию, когда приходит "filter". 
	//Формируем "URL" строку из: "filter.term", "filter.friend", "currentPage"

	useEffect(() => {
		navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`);

	}, [navigate, filter.friend, filter.term, currentPage])




	//Чтобы при загрузке получить начальнеый набор "User"-ов. 
	//"useEffect" - синхронизмирует
	//Вместо "ComponentDidMount" используем "useEffect"
	
	let location = useLocation();
	const [searchParams] = useSearchParams(location.search);

	

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
			<UserSearchForm onFilterChanged={onFilterChanged} />
			{/* Вызываем компоненту с постраничным выводом объектов группой	по pageSize штук-------------------------------- */}
			<Paginator totalItemsCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChanged={onPageChanged} />


			<div>

				{users.map(u => <User user={u}
					followingInProgress={followingInProgress}
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
