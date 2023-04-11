import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, OperatorFunction, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor (
		protected readonly http: HttpClient
	) { }

	private responseLogic<T>(): OperatorFunction<ApiResponse<T>, any> {
		return response$ => response$.pipe(
			tap(
				{
					next: (data) => {
						if (!data.success) {

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
			),
			catchError((err) => {
				return throwError(() => new Error(err));
			})
		);
	}

	protected post<T>(body: Object = {}, params: HttpParams = new HttpParams()): Observable<T> {
		console.debug(`${environment.api_url}`);
		return this.http.post<ApiResponse<T>>(`${environment.api_url}`, body, { params: params }).pipe(
			this.responseLogic()
		);
	}

}
