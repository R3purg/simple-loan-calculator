import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { IncomeInfoDto } from '../../models/IncomeInfoDto';
import { ChildrenEnum } from '../../enums/ChildrenEnum';
import { CoApplicantEnum } from '../../enums/CoApplicantEnum';
import { LoansService } from '../../services/loans.service';

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

	requestedAmount: number = 20000000;
	loanTerm: number = 36;
	children = ChildrenEnum;
	coApplicant = CoApplicantEnum;

	constructor (
		private loanService: LoansService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.form = this.prepareFormGroup(new IncomeInfoDto({}));
	}

	private prepareFormGroup(incomeInfo: IncomeInfoDto) {
		const group: any = {};

		Object.entries(incomeInfo).forEach((entry) => {
			group[entry[0]] = new FormControl(entry[1] || '', Validators.required);
		});

		return new FormGroup(group);
	}

	onSubmit(): void {
		this.loanService.calcInterest(this.form.value).subscribe(response => {
			console.log('response: ', response);
		});
	}

}
