import { LayoutComponent } from './core/layout/layout.component';

export const ROUTES = [
	{
		path: '',
		component: LayoutComponent,
		data: {
			reuseComponent: true
		},
		children: [
			{
				path: 'calculators',
				loadChildren: () => import('./modules/loans/loans.module').then(mod => mod.LoansModule)
			},
			{
				path: '**',
				redirectTo: 'calculators'
			}
		]
	},
	{
		path: '**',
		redirectTo: 'home'
	}
];
