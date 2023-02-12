import request from './request';

enum api {
	user = '/user'
}

export function addUser(data: object) {
	return request.post({ url: api.user, data });
}
export function getUserList(params: object) {
	return request.get({ url: api.user, params });
}
export function delUser(id: number) {
	return request.delete({ url: `${api.user}/${id}` });
}
export function updateUser(data: any) {
	return request.patch({ url: `${api.user}/${data.id}`, data });
}
