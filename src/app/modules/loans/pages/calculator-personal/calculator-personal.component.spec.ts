import { DebugElement } from '@angular/core';
import { LoansModule } from '../../loans.module';
import { TranslateService } from '@ngx-translate/core';
import { LoansService } from '../../services/loans.service';
import { CalculatorPersonalComponent } from './calculator-personal.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

xdescribe('CalculatorPersonalComponent', () => {

	let component: CalculatorPersonalComponent,
			fixture: ComponentFixture<CalculatorPersonalComponent>,
			el: DebugElement,
			loans: any,
			translate: any;

	beforeEach(waitForAsync(() => {
		const loansSpy = jasmine.createSpyObj('LoansService', ['calcInterest', 'calcPayment']);
		const translateSpy = jasmine.createSpyObj('TranslateService', ['get']);

		TestBed.configureTestingModule({
			imports: [
				LoansModule
			],
			providers: [
				{ provide: LoansService, useValue: loansSpy },
				{ provide: TranslateService, useValue: translateSpy }
			]
		}).compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(CalculatorPersonalComponent);
				
				fixture.detectChanges();
				
				component = fixture.componentInstance;
				el = fixture.debugElement;
				loans = TestBed.inject(LoansService);
				translate = TestBed.inject(TranslateService);
			});
	}));

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

});