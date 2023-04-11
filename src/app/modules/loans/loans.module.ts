import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CalculatorComponent } from './pages/calculator/calculator.component';

@NgModule({
	declarations: [
		CalculatorComponent
	],
	imports: [
		SharedModule
	]
})
export class LoansModule { }
