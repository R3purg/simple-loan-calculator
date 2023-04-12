import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './core/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptor } from './shared/interceptors/request.interceptor';

import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './shared/interceptors/lower-case.serializer';

import localeLt from '@angular/common/locales/lt';
import { registerLocaleData } from '@angular/common';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		CoreModule,
		LayoutModule,
		SharedModule,
		BrowserAnimationsModule,
		AppRoutingModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
		{ provide: UrlSerializer, useClass: LowerCaseUrlSerializer }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor () {
		registerLocaleData(localeLt, 'lt');
	}
}
