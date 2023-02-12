export interface Result {
	state: number;
	message: string;
}

export interface ResultData<T> extends Result {
	data?: T;
}
