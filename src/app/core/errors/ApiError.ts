interface ApiErrorGeneral {
	code: string,
	message: string
}

interface ApiErrorFields {
	params: string,
	message: string
}

export interface ApiError {
	general: ApiErrorGeneral,
	fields: ApiErrorFields[]
}