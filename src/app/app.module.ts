import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { CoreModule } from './core/core.module';
import { CalculatorComponent } from './modules/loans/calculator/calculator.component';

@NgModule({
	declarations: [
		AppComponent,
  CalculatorComponent
	],
	imports: [
		BrowserModule,
		CoreModule,
		LayoutModule,
		SharedModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
