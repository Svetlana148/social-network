import React, {useState} from 'react';
import s from './Paginator.module.css';
import cn from "classnames";


//Отрисовывает страничку с User-ами------------------------------------------

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
	let pagesCount = Math.ceil(totalItemsCount / pageSize);
	let pages = [];
	for (let i=1; i<= pagesCount; i++) {
		pages.push(i);
	};

	let portionCount = Math.ceil(pagesCount / portionSize);

	//local state для portionNumber------------------------------------------
	let [portionNumber, setPortionNumber] = useState(1);

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
													onClick = {(e) => {onPageChanged(p)
													}}>{p}
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