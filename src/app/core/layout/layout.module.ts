import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { LayoutComponent } from './layout.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		LayoutComponent
	],
	imports: [
		SharedModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		LayoutComponent
	]
})
export class LayoutModule {}