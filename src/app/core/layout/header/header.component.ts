import { Component } from '@angular/core';
import { headerItems } from './header.items';
import { LanguageEnum } from '../../enum/LanguageEnum';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	headerItems = headerItems;
	languageEnum = LanguageEnum;
}
