import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { LOANS_ROUTES } from './loans.routes';

import { CalculatorMainComponent } from './pages/calculator-main/calculator-main.component';
import { CalculatorPersonalComponent } from './pages/calculator-personal/calculator-personal.component';

@NgModule({
	declarations: [
		CalculatorMainComponent,
		CalculatorPersonalComponent,
	],
	imports: [
		RouterModule.forChild(LOANS_ROUTES),
		SharedModule
	]
})
export class LoansModule { }
