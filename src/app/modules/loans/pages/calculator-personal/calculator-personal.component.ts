import { Component, OnInit } from '@angular/core';
import { IncomeInfo } from '../../models/IncomeInfo';
import { ChildrenEnum } from '../../enums/ChildrenEnum';
import { LoansService } from '../../services/loans.service';
import { CoApplicantEnum } from '../../enums/CoApplicantEnum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';

@Component({
	selector: 'app-calculator-personal',
	templateUrl: './calculator-personal.component.html',
	styleUrls: ['./calculator-personal.component.scss']
})
export class CalculatorPersonalComponent implements OnInit {

	form: FormGroup = new FormGroup({});

	private monthlyPaymentSubject = new BehaviorSubject<number>(0);
	public monthlyPayment$ = this.monthlyPaymentSubject.asObservable();

	children = ChildrenEnum;
	coApplicant = CoApplicantEnum;
	monthlyIncome: number = 0;

	constructor (
		private loanService: LoansService
	) { }

	ngOnInit(): void {
		this.form = this.prepareFormGroup(new IncomeInfo({}));
		this.handleInputChange();
	}

	handleInputChange() {
		this.form.valueChanges.pipe(
			startWith(null),
			distinctUntilChanged(),
			debounceTime(500)
		).subscribe(() => {
			this.calcPayment().subscribe();
		});
	}

	private prepareFormGroup(incomeInfo: IncomeInfo) {
		const group: any = {};

		this.monthlyIncome = incomeInfo.monthlyIncome;

		Object.entries(incomeInfo).forEach((entry) => {
			group[entry[0]] = new FormControl(entry[1] || '', Validators.required);
		});

		return new FormGroup(group);
	}

	private calcPayment(): Observable<void> {
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
}