import { Component } from '@angular/core';
import { headerItems } from './header.items';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	headerItems = headerItems;
}
