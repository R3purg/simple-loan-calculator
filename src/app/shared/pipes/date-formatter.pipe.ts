import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'dateFormat'
})
export class DateFormatterPipe implements PipeTransform {

	transform(value: number): string {
		var years: number = (value / 12);
		var months: number = 0;

		if (years % 1 != 0) {
			years = Math.floor(years);
			months = 6;
		}

		return `${years} metai ${months > 0 ? months + ' mėnesiai' : ''}`;
	}

}
