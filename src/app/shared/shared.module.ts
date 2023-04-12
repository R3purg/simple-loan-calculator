import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// CalculatorPersonalComponent
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { DateFormatterPipe } from './pipes/date-formatter.pipe';

// HeaderComponent
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
	declarations: [
		DateFormatterPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
		FlexLayoutModule,
		MatSliderModule,
		MatToolbarModule,
		MatIconModule,
		MatTabsModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		TranslateModule,
		MatButtonToggleModule
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
		MatButtonModule,
		TranslateModule,
		MatButtonToggleModule
	]
})
export class SharedModule { }
