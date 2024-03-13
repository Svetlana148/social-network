// ф-ци для всех reducers, которая бежит по массиву и ищет совпадения и меняет в этом О. что-то

export const updateObjectInArray = (items: any, itemsId: any, objPropName: any, newObjProps: any) =>{
	return items.map( (u: any)=>{
		if (u[objPropName] ===
			itemsId) {
			return{...u, ...newObjProps}
		};
		return u;
	})			
}



