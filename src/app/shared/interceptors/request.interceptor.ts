import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
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
		return next.handle(clonedReq);
	}
}