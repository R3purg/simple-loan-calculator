import { Injectable } from '@angular/core';
import { LanguageEnum } from '../enum/LanguageEnum';
import { environment } from 'src/environments/environment';

@Injectable()
export class LanguageService {

	/**
	 * Get all available language from enum
	 * @returns Array<string>
	 */
	langs(): Array<string> {
		var keys = Object.keys(LanguageEnum);
		return keys.slice(keys.length / 2);
	}

	/**
	 * Get and set specific language from environment
	 * @returns string
	 */
	getLanguage(): string {
		var lang = localStorage.getItem('language');

		if (lang != null) return lang;

		localStorage.setItem('language', environment.locale_id);
		lang = environment.locale_id;

		return lang;
	}

	/**
	 * Change language
	 * @returns void
	 */
	changeLanguage(language: string): void {
		if (localStorage.getItem('language') !== language) {
			localStorage.setItem('language', language);
		}
	}

}
