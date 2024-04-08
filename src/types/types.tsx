export type PostType = {
	id: number
	message: string
	likesCount: number
}

export type ContactsType = { // типизация Объекта Contacts
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
}

export type PhotosType = { // типизация Объекта Photos
	small: string | null
	large: string | null
}

export type ProfileType = { // типизация всего Profile
	userId: number

	fullName:  string
	lookingForAJob: boolean
	lookingForAJobDescription: string
	aboutMe:  string
	contacts: ContactsType
	
	photos: PhotosType
}

export type UserType = { // Типизируем User-а
	id : number
	name : string
	status : string
	photos : PhotosType
	followed : boolean
}

