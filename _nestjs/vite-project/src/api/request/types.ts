export interface Result {
	errorCode: string | number;
	errorInfo: string;
}

export interface ResultData<T = any> extends Result {
	data?: T;
}