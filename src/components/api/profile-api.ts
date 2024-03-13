import { PhotosType, ProfileType } from '../../types/types';
import { APIResponseType, instance } from './api';




//Типизируем "savePhoto" --------------------------------------------------
type SavePhotoResponseDataType={
	photos : PhotosType
}
// Группа запросов на сервер для Profile--------------------------
export const ProfileAPI = {
	getProfile(userId: number) {
		return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
	},
	getStatus(userId: number) {
		return instance.get<string>(`profile/status/` + userId).then(res => res.data)
	},
	updateStatus(status: string) {
		return instance.put<APIResponseType>(`profile/status`, { status: status }).then(res => res.data)
	},


	

	savePhoto(photoFile: File) {   //"File" из DOM-объекта
		const formData = new FormData();
		formData.append("image", photoFile)
		//Типизируем запрос "put" для "savePhot". Это стандартный тип ответа "APIResponseType"с уточнением про фото"<PhotosType>""
		return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`,
			// Вторым параметром меняем тип отсылаемого файла
			formData,
			// 3-м настраиваем заголовки этого запроса
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(res => res.data);
	},
	//--------------------------------------------------

	saveProfile(profile: ProfileType) {
		return instance.put<APIResponseType>(`profile`, profile).then(res => res.data);
	},
}