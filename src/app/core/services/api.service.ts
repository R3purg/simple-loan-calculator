import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, OperatorFunction, catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class ApiService {

	/**
	 * @constructor
	 * @param HttpClient http - HTTP client
	 */
	constructor (
		protected readonly http: HttpClient
	) { }

	/**
	 * HTTP POST API request base function
	 * @returns Observable<T>
	 */
	protected post<T>(body: Object = {}, params: HttpParams = new HttpParams()): Observable<T> {
		return this.http.post<ApiResponse<T>>(`${environment.api_url}`, body, { params: params }).pipe(
			this.responseLogic()
		);
	}

	/**
	 * HTTP request base response logic
	 * @returns OperatorFunction<ApiResponse<T>, any>
	 */
	private responseLogic<T>(): OperatorFunction<ApiResponse<T>, any> {
		return response$ => response$.pipe(
			switchMap((response) => {
				return of({
					success: true,
					response: response
				} as ApiResponse<T>);
			}),
			catchError((err) => {
				return of({
					success: false,
					response: err.error
				} as ApiResponse<T>);
			}),
			tap(
				{
					next: (data) => {
						if (!data.success) {
							console.debug('Error from ApiService HTTP PUT request: ', data);
						} else {
							console.debug('Data from ApiService HTTP PUT request: ', data);
						}
					}
				}
			),
			map(
				data => {
					return data.response;
				}
			)
		);
	}

}
