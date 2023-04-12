import { Observable, tap } from 'rxjs';
import { IncomeInfo } from '../models/IncomeInfo';
import { ApiService } from 'src/app/core/services/api.service';
import { LoanInfo } from '../models/LoanInfo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LoansService extends ApiService {

	constructor (
		http: HttpClient
	) {
		super(http);
	}

	/**
	 * .
	 * @returns Observable<LoanInfo>
	 */
	calcInterest(incomeInfo: IncomeInfo): Observable<LoanInfo> {
		return this.post<LoanInfo>(incomeInfo).pipe(
			tap(
				{
					error: (err) => {
						console.log('err in calculateLoan()');
					}
				}
			)
		);
	}

	calcPayment(price: number /* requestedAmount */, advanceSum: number /* 0 */, periodMonths: number /* loanTerm */, interest: number /* result of calculateLoan() -> interestRate */, residualValue: number /* 0 */): number {
		if (interest == 0) {
			return ( price - advanceSum - (price * residualValue / 100) ) / periodMonths;
		}	else {
			return (((interest / 100 / 12) * ((price - advanceSum)-((price * residualValue / 100) / (Math.pow((interest / 100 / 12) + 1, periodMonths)))) / (1 - (1 / Math.pow((interest / 100 / 12) + 1, periodMonths)))));
		}
	}

// private calcPaymentQt(price: number, advanceSum: number, periodQts: number, interest: number, residualValue: number) {
//   if (interest == 0) {
//     return ( price - advanceSum - (price * residualValue / 100) ) / periodQts;
//   }	else {
//     return (((interest / 100 / 4) * ((price - advanceSum)-((price * residualValue / 100) / (Math.pow((interest / 100 / 4) + 1, periodQts)))) / (1 - (1 / Math.pow((interest / 100 / 4) + 1, periodQts)))));
//   }
// }

}
