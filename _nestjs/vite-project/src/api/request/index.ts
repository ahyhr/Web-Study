import axios from 'axios';
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ResultData } from './types';
import { ElMessage } from 'element-plus';
const config: AxiosRequestConfig = {
	baseURL: 'http://127.0.0.1:3000',
	timeout: 5000
};

class RequestHttp {
	private instance: AxiosInstance;
	public constructor() {
		this.instance = axios.create(config);

		// 请求拦截器
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
		// 响应拦截器
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				if (data.status !== 200) {
					ElMessage.error(data.message);
					return Promise.reject(data);
				}
				return data;
			},
			async (error: AxiosError) => {
				const { message } = error;
				ElMessage.error(message);
				return Promise.reject(error);
			}
		);
	}

	public get<T>(config: AxiosRequestConfig): Promise<any> {
		return this.instance.request({ ...config, method: 'GET' });
	}
	public post<T>(config: AxiosRequestConfig): Promise<any> {
		return this.instance.request({ ...config, method: 'POST' });
	}
	public delete<T>(config: AxiosRequestConfig): Promise<any> {
		return this.instance.request({ ...config, method: 'DELETE' });
	}
	public patch<T>(config: AxiosRequestConfig): Promise<any> {
		return this.instance.request({ ...config, method: 'PATCH' });
	}
}

export default new RequestHttp();
