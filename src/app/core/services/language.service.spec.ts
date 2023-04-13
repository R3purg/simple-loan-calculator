import { TestBed } from "@angular/core/testing";
import { LanguageEnum } from "../enum/LanguageEnum";
import { LanguageService } from "./language.service";
import { environment } from "src/environments/environment";

describe('LanguageService', () => {

	let language: LanguageService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LanguageService
			]
		});

		// Singleton implementation of the LanguageService
		language = TestBed.inject(LanguageService);
	});

	it('should get all available languages from enum', () => {
		const result = language.langs();

		expect(result.length).toBe(Object.values(LanguageEnum).length / 2);
	});

	it('should get and set specific language from environment', () => {
		const result = language.getLanguage();

		expect(result).toBe(environment.locale_id);
	});

});