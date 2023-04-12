import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { IncomeInfo } from '../../models/IncomeInfo';
import { ChildrenEnum } from '../../enums/ChildrenEnum';
import { CoApplicantEnum } from '../../enums/CoApplicantEnum';
import { LoansService } from '../../services/loans.service';
import { BehaviorSubject, Observable, debounceTime, delay, distinctUntilChanged, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

// export class SliderConfigurableExample {
// 	disabled = false;
// 	min = 0;
// 	max = 100;
// 	showTicks = false;
// 	step = 1;
// 	thumbLabel = false;
// 	value = 0;
// }

// [disabled]="disabled"
// [max]="max"
// [min]="min"
// [step]="step"
// [discrete]="thumbLabel"
// [showTickMarks]="showTicks"

@Component({
	selector: 'app-calculator-personal',
	templateUrl: './calculator-personal.component.html',
	styleUrls: ['./calculator-personal.component.scss']
})
export class CalculatorPersonalComponent implements OnInit {

	form: FormGroup = new FormGroup({});

  private monthlyPaymentSubject = new BehaviorSubject<number>(0);
  public monthlyPayment$ = this.monthlyPaymentSubject.asObservable();

	requestedAmount: number = 20000000;
	loanTerm: number = 36;
	children = ChildrenEnum;
	coApplicant = CoApplicantEnum;

	temp: number = 0;

	constructor (
		private loanService: LoansService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.form = this.prepareFormGroup(new IncomeInfo({}));
		this.handleInputChange();
	}

	onSubmit(): void {
		// this.calcPayment().subscribe();
	}

	onInputChange(value: any) {
		console.log(value);
		// this.form.get('requestedAmount')?.setValue(value);
	}

	private handleInputChange() {
		// this.temp = this.form.get('requestedAmount')?.value;
		this.form.get('requestedAmount')?.valueChanges.subscribe(value => {
			console.log('value: ', value);
			this.calcPayment().subscribe();
			// this.temp = value ?? 0;
		});
	}

	private prepareFormGroup(incomeInfo: IncomeInfo) {
		const group: any = {};

		Object.entries(incomeInfo).forEach((entry) => {
			group[entry[0]] = new FormControl(entry[1] || '', Validators.required);
		});

		return new FormGroup(group);
	}

	private calcPayment(): Observable<void> {
		return this.loanService.calcInterest(this.form.value).pipe(
			distinctUntilChanged(),
			debounceTime(3000),
			switchMap(
				(response) =>
					of(
							this.monthlyPaymentSubject.next(
								this.loanService.calcPayment(
									Number.parseInt(this.form.get('requestedAmount')?.value),
									0,
									Number.parseInt(this.form.get('loanTerm')?.value),
									response.interestRate,
									0
								)
							)
						)
			)
		);
	}


}
