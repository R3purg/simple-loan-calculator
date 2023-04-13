import { IncomeInfo } from '../../models/IncomeInfo';
import { ChildrenEnum } from '../../enums/ChildrenEnum';
import { LoansService } from '../../services/loans.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoApplicantEnum } from '../../enums/CoApplicantEnum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, EMPTY, Observable, Subject, debounceTime, distinctUntilChanged, of, startWith, switchMap, takeUntil } from 'rxjs';

@Component({
	selector: 'app-calculator-personal',
	templateUrl: './calculator-personal.component.html',
	styleUrls: ['./calculator-personal.component.scss']
})
export class CalculatorPersonalComponent implements OnInit, OnDestroy {

	form: FormGroup = new FormGroup({});

	unsubObs$ = new Subject();

	private monthlyPaymentSubject = new BehaviorSubject<number>(0);
	public monthlyPayment$ = this.monthlyPaymentSubject.asObservable();

	children = ChildrenEnum;
	coApplicant = CoApplicantEnum;
	requestedAmount: number = 0;

	constructor (
		private loanService: LoansService
	) { }

	ngOnInit(): void {
		this.form = this.prepareFormGroup(new IncomeInfo({}));
		this.handleInputChange();
	}

	private handleInputChange() {
		this.form.valueChanges.pipe(
			takeUntil(this.unsubObs$),
			startWith(null),
			distinctUntilChanged(),
			debounceTime(500)
		).subscribe(() => {
			console.log('form errors: ', this.form.errors);
			console.log('form errors: ', this.form.get('requestedAmount')?.errors);
			this.calcPayment().subscribe();
		});
	}

	private prepareFormGroup(incomeInfo: IncomeInfo) {
		const group: any = {};

		this.requestedAmount = incomeInfo.requestedAmount;

		Object.entries(incomeInfo).forEach((entry) => {
			group[entry[0]] = new FormControl(entry[1] || '', Validators.required);
		});

		return new FormGroup(group);
	}

	private calcPayment(): Observable<void> {
		if (!this.form.valid) return EMPTY;

		return this.loanService.calcInterest(this.form.value).pipe(
			switchMap(
				(response) =>
					of(
							this.monthlyPaymentSubject.next(
								this.loanService.calcPayment(
									Number.parseInt(this.form.get('requestedAmount')?.value),
									0,
									Number.parseInt(this.form.get('loanTerm')?.value),
									(response.interestRate / 1000),
									0
								)
							)
						)
			)
		);
	}

	ngOnDestroy(): void {
		this.unsubObs$.next(true);
		this.unsubObs$.complete();
	}
}