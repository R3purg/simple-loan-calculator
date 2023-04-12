import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

	constructor () { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let clonedReq = req.clone();
		// let clonedReq = req.clone({ headers: req.headers.append('Access-Control-Allow-Origin', '*') });
		clonedReq = req.clone({ headers: req.headers.append('X-API-KEY', environment.api_key) });
		return next.handle(clonedReq).pipe(
			catchError(
				err =>
					new Observable<HttpEvent<any>>(observer => {
						if (err instanceof HttpErrorResponse) {
							let errMsg: string = '';
							if (err.status === 403 || err.status === 520) {
								errMsg = 'server_error_try_again';
							} else if (err.status === 0 || err.status === 404) {
								errMsg = 'server_error';
							}
							err = errMsg ? new Error(errMsg) : err;
						}
						observer.error(err);
						observer.complete();
					})
			)
		);
	}
}