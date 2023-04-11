import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// CalculatorPersonalComponent
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';

// HeaderComponent
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatMenuModule } from '@angular/material/menu';

@NgModule({
	declarations: [
		DateFormatterPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatSliderModule,
		MatToolbarModule,
		MatIconModule,
		MatTabsModule,
		MatInputModule,
		MatSelectModule,
		// MatMenuModule
	],
	exports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatSliderModule,
		MatToolbarModule,
		MatIconModule,
		MatTabsModule,
		MatInputModule,
		MatSelectModule,
		DateFormatterPipe,
		// MatMenuModule
	]
})
export class SharedModule { }
