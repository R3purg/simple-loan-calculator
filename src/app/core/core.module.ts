import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ApiService } from './services/api.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LanguageService } from './services/language.service';
import { InternationalizationModule } from '../shared/module/internationalization.module';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '../../assets/locales/', '.json');
}

@NgModule({
	imports: [
		HttpClientModule,
		InternationalizationModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, deps: [LanguageService],
			useFactory: (languageService: any) => languageService.getLanguage()
		},
		ApiService,
		LanguageService
	],
	declarations: []
})
export class CoreModule { }
