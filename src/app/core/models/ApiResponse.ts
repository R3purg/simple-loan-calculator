import { ApiError } from "../errors/ApiError";

export interface ApiResponse<T> {
	success: boolean;
	response: T | ApiError;
}