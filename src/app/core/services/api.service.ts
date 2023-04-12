import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { ApiError } from '../errors/ApiError';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, OperatorFunction, catchError, map, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor (
		protected readonly http: HttpClient
	) { }

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
				// return throwError(() => new Error(err));
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

	protected post<T>(body: Object = {}, params: HttpParams = new HttpParams()): Observable<T> {
		console.debug(`${environment.api_url}`);
		return this.http.post<ApiResponse<T>>(`${environment.api_url}`, body, { params: params }).pipe(
			this.responseLogic()
		);
	}

}
