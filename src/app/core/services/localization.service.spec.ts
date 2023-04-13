import { of } from "rxjs";
import { LanguageService } from "./language.service";
import { TranslateService } from "@ngx-translate/core";
import { LocalizationService } from "./localization.service";
import { TestBed, fakeAsync, flushMicrotasks, waitForAsync } from "@angular/core/testing";

describe('LocalizationService', () => {

	let translateSpy: any,
			languageSpy: any,
			localization: LocalizationService;

	beforeEach(waitForAsync(() => {
		translateSpy = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use', 'instant']);
		languageSpy = jasmine.createSpyObj('LanguageService', ['getLanguage']);

		TestBed.configureTestingModule({
			providers: [
				LocalizationService,
				// Angular Dependency Injection mechanism,
				// swapping actual implementations with Jasmine Spy
				{ provide: TranslateService, useValue: translateSpy },
				{ provide: LanguageService, useValue: languageSpy },
			]
		}).compileComponents()
			.then(() => {
				// Singleton implementation of the LocalizationService
				localization = TestBed.inject(LocalizationService);
			})
	}));

	it('should initialize service', fakeAsync(() => {
		translateSpy.use.and.returnValue(of(''));

		const result = localization.initService();

		flushMicrotasks();

		expect(result).toBeTruthy();
		expect(translateSpy.setDefaultLang).toHaveBeenCalledTimes(1);
		expect(translateSpy.use).toHaveBeenCalledTimes(1);
		expect(languageSpy.getLanguage).toHaveBeenCalledTimes(1);
	}));

	it('should get the instant translated value of a key (or an array of keys)', () => {
		localization.translate('');

		expect(translateSpy.instant).toHaveBeenCalledTimes(1);
	});

});