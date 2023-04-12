
import { APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationService } from '../../core/services/localization.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { LanguageService } from 'src/app/core/services/language.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule.forChild()],
  exports: [TranslateModule],
  declarations: [],
})
export class InternationalizationModule {
  public static forRoot(): ModuleWithProviders<InternationalizationModule> {
    return {
      ngModule: InternationalizationModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initLocalizationService,
          deps: [LocalizationService],
          multi: true
        },
        LocalizationService,
        // { provide: LOCALE_ID, useValue: config.locale_id }, // using the initial value
        {
          provide: LOCALE_ID,
          deps: [LanguageService],
          useFactory: (languageService: any) => languageService.getLanguage()
        }
      ]
    };
  }
}
/**
  * Initialize the localization service.
  * @param {LocalizationService} service
  * @returns {() => Promise<void>}
  */
export function initLocalizationService(service: LocalizationService) {
  return () => service.initService();
}
