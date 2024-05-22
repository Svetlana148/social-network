//HOC - Контейнер для загружаемой компоненты (пока к-та загружается, крутится запись "Loading")
//Теперь не нужет, т.к. есть стандартный "React.Suspense"

import React from "react";
// import Preloader from "../common/Preloader/Preloader";

// В "WCP extends {}" теперь там только ТипОБЪЕКТ с наполнением-props-ами-"WCP"
export function withSuspense<WCP extends {}>(WrappedComponent: React.ComponentType<WCP>){
	return (props: WCP) => {
		return <React.Suspense fallback = {<div>loading... </div>}> 
		{/* //Показывает "loading", пока вызываетый -ом компонент не загрузился */}
			<WrappedComponent {...props}/>
		</React.Suspense>
	};
}
