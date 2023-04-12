import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

	constructor () { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let clonedReq = req.clone();
		clonedReq = req.clone({ headers: req.headers.append('X-API-KEY', environment.api_key) });
		// let clonedReq = req.clone({ headers: req.headers.append('Access-Control-Allow-Origin', '*') });

		return next.handle(clonedReq);
	}
}