import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
	name: 'dateFormat'
})
export class DateFormatterPipe implements PipeTransform {

	constructor (
		private translate: TranslateService
	) { }

	transform(value: number): string {
		var years: number = (value / 12);
		var months: number = 0;
		
		if (years % 1 != 0) {
			years = Math.floor(years);
			months = 6;
		}
		
		var result: string = `${years} `;

		this.translate.get([
			'common.years',
			'common.years_genitivus',
			'common.months'
		]).subscribe(t => {
			result += `${years > 9 ? t['common.years_genitivus'] : t['common.years']} ${months > 0 ? months + ` ${t['common.months']}` : ''}`;
		});

		return result;
	}

}
