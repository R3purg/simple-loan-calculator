import { CalculatorMainComponent } from "./pages/calculator-main/calculator-main.component";
import { CalculatorPersonalComponent } from "./pages/calculator-personal/calculator-personal.component";

export const LOANS_ROUTES = [
	{
		path: '',
		component: CalculatorMainComponent,
		children: [
			{ path: 'personal', component: CalculatorPersonalComponent },
			{
				path: '**',
				redirectTo: 'personal'
			}
		]
	}
];
