import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InternationalizationModule } from '../shared/module/internationalization.module';

import {
	ConfigurationService,
	LanguageService
} from './services/'
import { ApiService } from './services/api.service';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '../assets/locales/', '.json');
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
		}),
		// ToastrModule.forRoot({
		// 	preventDuplicates: true,
		// 	tapToDismiss: true,
		// 	closeButton: true,
		// 	resetTimeoutOnDuplicate: true,
		// 	includeTitleDuplicates: true,
		// }),
	],
	providers: [
		// { provide: MAT_DATE_LOCALE, deps: [LanguageService],
		// 	useFactory: (languageService) => languageService.getLanguage()
		// },
		// { provide: DateAdapter,
		// 	useClass: CustomDateAdapter,
		// 	deps: [MAT_DATE_LOCALE, Platform]
		// },
		ApiService,
		LanguageService,
		ConfigurationService
	],
	declarations: []
})
export class CoreModule {}
