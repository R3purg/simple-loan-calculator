import { Injectable, Optional, SkipSelf } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { catchError, lastValueFrom } from 'rxjs';

/**
 * Class representing the translation service.
 */
@Injectable()
export class LocalizationService {
	private _localeId: string = 'en-US'; // default
	// private _localeId: string = 'lt-LT';

	/**
	 * @constructor
	 * @param {LocalizationService} singleton - the localization service
	 * @param {LocalizationServiceConfig} config - the localization config
	 * @param {TranslateService} translateService - the translate service
	 */
	constructor(
		@Optional() @SkipSelf() private singleton: LocalizationService,
		private translateService: TranslateService,
		private languageService: LanguageService
	) {
		if (this.singleton) {
			throw new Error(
				'LocalizationService is already provided by the root module'
			);
		}
		this._localeId = this.languageService.getLanguage();
	}

	/**
	 * Initialize the service.
	 * @returns {Promise<void>}
	 */
	public initService(): Promise<void> {
		// language code same as file name.
		this._localeId = this._localeId || 'en-US';
		return this.useLanguage(this._localeId);
	}

	/**
	 * change the selected language
	 * @returns {Promise<void>}
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
	 * Gets the instant translated value of a key (or an array of keys).
	 * @param key
	 * @param interpolateParams
	 * @returns {string|any}
	 */
	public translate(key: string | string[], interpolateParams?: object): string {
		return this.translateService.instant(key, interpolateParams) as string;
	}
}
