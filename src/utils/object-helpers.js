// ф-ци для всех reducers, которая бежит по массиву и ищет совпадения и меняет в этом О. что-то.то

export const updateObjectInArray = (items, itemsId, objPropName, newObjProps) =>{

items.map( u=>{
		if (u[objPropName] ===
			itemsId) {
			return{...u, ...newObjProps}
		};
		return(u);
	})			
}



