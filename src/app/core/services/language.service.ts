import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LanguageEnum } from '../enum/LanguageEnum';

@Injectable()
export class LanguageService {

	langs() : Array<string> {
		var keys = Object.keys(LanguageEnum);
		return keys.slice(keys.length / 2);
	}

	constructor (
		private http: HttpClient
	) { }

	getLanguage(): string {
		var lang = localStorage.getItem('language');

		if (lang != null) return lang;

		localStorage.setItem('language', environment.locale_id);
		lang = environment.locale_id;

		return lang;
	}

	changeLanguage(language: string): void {
		if (localStorage.getItem('language') !== language) {
			localStorage.setItem('language', language);
			// location.reload();
		}
	}

	// alpha2Code
	// getLanguageFlag(language: string): string {
	// 	if (language.length == 2) {
	// 		return `flag-icon flag-icon-${language === 'en' ? 'gb' : language}`;
	// 	}
	// 	else {
	// 		language = language.slice(0, 2);
	// 		return `flag-icon flag-icon-${language === 'en' ? 'gb' : language}`;
	// 	}
	// }

	// getCountriesByLocale() {
	// 	let lang = this.getLanguage();
	// 	return this.http.get(`../../../assets/locales/countries/countries_${lang.substring(0, 2)}.json`);
	// }

}
