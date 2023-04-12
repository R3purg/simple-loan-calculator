import { catchError, lastValueFrom } from 'rxjs';
import { LanguageService } from './language.service';
import { TranslateService } from '@ngx-translate/core';
import { Injectable, Optional, SkipSelf } from '@angular/core';

@Injectable()
export class LocalizationService {
	private _localeId: string = 'lt-LT';

	/**
	 * @constructor
	 * @param LocalizationService singleton - localization service
	 * @param TranslateService translateService - translation service
	 * @param LanguageService languageService - language service
	 */
	constructor (
		@Optional() @SkipSelf() private singleton: LocalizationService,
		private translateService: TranslateService,
		private languageService: LanguageService
	) {
		if (this.singleton)
			throw new Error();

		this._localeId = this.languageService.getLanguage();
	}

	/**
	 * Initializing service
	 * @returns Promise<void>
	 */
	public initService(): Promise<void> {
		return this.useLanguage(this._localeId ?? 'lt-LT');
	}

	/**
	 * Changing language for translations
	 * @param lang
	 * @returns Promise<void>
	 */
	public useLanguage(lang: string): Promise<void> {
		this.translateService.setDefaultLang(lang);
		return lastValueFrom(this.translateService
			.use(lang)
			.pipe(
				catchError(() => {
					throw new Error('LocalizationService.init failed');
				})
			));
	}

	/**
	 * Gets the instant translated value of a key (or an array of keys)
	 * @param key
	 * @param interpolateParams
	 * @returns string
	 */
	public translate(key: string | string[], interpolateParams?: object): string {
		return this.translateService.instant(key, interpolateParams) as string;
	}
}
