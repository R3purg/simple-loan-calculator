import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';
import { LowerCaseUrlSerializer } from './shared/interceptors/lower-case.serializer';
import { UrlSerializer } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeLt from '@angular/common/locales/lt';
import localeLv from '@angular/common/locales/lv';

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
		registerLocaleData(localeLv, 'lv');
	}
}
