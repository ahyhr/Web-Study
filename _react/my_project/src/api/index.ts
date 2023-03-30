import request from './request';
import type { IRights } from './types';

enum api {
	/** 菜单列表 */
	rights = '/rights'
}

export function deleteRight(id: number) {
	return request.delete({ url: `${api.rights}/${id}` });
}

export function updateRights<T>(id: number, data: T) {
	return request.patch({ url: `${api.rights}/${id}`, data });
}

export function getRightBuyId(id: number) {
	return request.get<IRights>({ url: `${api.rights}/${id}` });
}

export function getRightsList() {
	return request.get<IRights[]>({ url: api.rights });
}
