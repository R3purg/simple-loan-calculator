import { Component } from '@angular/core';
import { headerItems } from './header.items';
import { LanguageEnum } from '../../enum/LanguageEnum';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	constructor (
		public language: LanguageService
	) { }

	headerItems = headerItems;
	languages = Object.values(LanguageEnum);
}
