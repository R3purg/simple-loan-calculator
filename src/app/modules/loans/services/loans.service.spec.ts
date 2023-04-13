import { of, switchMap } from "rxjs";
import { LoansService } from "./loans.service";
import { TestBed } from "@angular/core/testing";
import { IncomeInfo } from "../models/IncomeInfo";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('LoansService', () => {

	let loans: LoansService,
			httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				LoansService
			]
		});

		// Singleton implementations
		loans = TestBed.inject(LoansService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should calculate interest', () => {
		const incomeInfo: IncomeInfo = new IncomeInfo();

		loans.calcInterest(incomeInfo).subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result.loanAmount).toBe(20000000);
			expect(result.interestRate).toBe(2500);
		});

		const req = httpTestingController.expectOne('');

		expect(req.request.method).toEqual('POST');

		req.flush({
			loanAmount: 20000000,
			interestRate: 2500
		});
	});

	it('should calculate monthly payment', () => {
		const incomeInfo: IncomeInfo = new IncomeInfo();

		loans.calcInterest(incomeInfo).pipe(
			switchMap(response => {
				return of(loans.calcPayment(
					(incomeInfo.requestedAmount / 1000),
					0,
					incomeInfo.loanTerm,
					(response.interestRate / 1000),
					0
				));
			})
		).subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toBe(577);
		});

		const req = httpTestingController.expectOne('');

		expect(req.request.method).toEqual('POST');

		req.flush({
			loanAmount: 20000000,
			interestRate: 2500
		});
	});

	afterEach(() => {
		httpTestingController.verify();
	});

});