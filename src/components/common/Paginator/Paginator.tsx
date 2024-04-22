//Считает сколько  и каких User-ов надо отображать в зависимости от: 
//portionNumber -текущая порция и какие страницы показывать между стрелками"вперед" "назад"


import React, {useState} from 'react';
import s from './Paginator.module.css';
import cn from "classnames";


//Типизируем Props-сы к-ты Paginator
type PropsType ={
	totalItemsCount : number
	pageSize : number
	currentPage : number
	onPageChanged? : (pageNumber : number)=>void //Ф-ция, кот. не принимает ничего и ничего не возвращает. Это callback
	portionSize? : number                        //"? " - Не обязательный параметр, т.е либо number; либо undefaind и присвоится 10
}

//Отрисовывает страничку с User-ами------------------------------------------
//Типизируем к-ту Paginator
let Paginator : React.FC<PropsType>= ({totalItemsCount,  
												pageSize, 
												currentPage = 1, 
												onPageChanged = x=>x, 
												portionSize = 10 }) => {
	let pagesCount = Math.ceil(totalItemsCount / pageSize);
	let pages : Array<number> = [];
	for (let i=1; i<= pagesCount; i++) {
		pages.push(i);
	};

	let portionCount = Math.ceil(pagesCount / portionSize);

	//local state для portionNumber------------------------------------------
	let [portionNumber, setPortionNumber] = useState(1);  // useState(1) - hok, обеспечивающий локальный State
	//Дает LockalState в "portionNumber"  и ф-цию, которая его меняет "setPortionNumber"

	let leftPortionPageNumber = (portionNumber -1)* portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;
	

	//portionNumber -текущая порция------------------------------

	return 	(
		// когда показывать стрелку назад-------------------------------
		<div className={s.paginator}>
			{portionNumber > 1 && 
			<button  onClick = {() => {setPortionNumber(portionNumber-1)}}> PREV </button >}
		
		{/* // фильтруем какие страницы показывать между стрелками------------------- */}
		{pages
			.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
			.map((p) =>{
				return <span className={cn ({[s.selectedPage] : currentPage === p},
													s.pageNumber)} 
													key = {p}
													onClick = {(e) => {onPageChanged(p)}
													}>{p}
						</span>
		})}
		
		{/* // когда показывать стрелку вперед------------------------------- */}
		{portionCount > portionNumber && 
			<button onClick = {() => {setPortionNumber(portionNumber + 1)}}> NEXT</button>
		}
	</div>
	)
};

export default Paginator;