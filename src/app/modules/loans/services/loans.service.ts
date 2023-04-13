import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoanInfo } from '../models/LoanInfo';
import { IncomeInfo } from '../models/IncomeInfo';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
	providedIn: 'root'
})
export class LoansService extends ApiService {

	/**
	 * @constructor
	 * @param HttpClient http - http service
	 */
	constructor (
		http: HttpClient
	) {
		super(http);
	}

	/**
	 * Calculates interest
	 * @param incomeInfo
	 * @returns Observable<LoanInfo>
	 */
	calcInterest(incomeInfo: IncomeInfo): Observable<LoanInfo> {
		return this.post<LoanInfo>(this.prepareDto(incomeInfo));
	}

	/**
	 * Calculates monthly payment
	 * @param price
	 * @param advanceSum
	 * @param periodMonths
	 * @param interest
	 * @param residualValue
	 * @returns number
	 */
	calcPayment(price: number, advanceSum: number = 0, periodMonths: number, interest: number, residualValue: number = 0): number {
		if (interest == 0) {
			return Math.round((price - advanceSum - (price * residualValue / 100)) / periodMonths);
		}	else {
			return Math.round((interest / 100 / 12) * ((price - advanceSum)-((price * residualValue / 100) / (Math.pow((interest / 100 / 12) + 1, periodMonths)))) / (1 - (1 / Math.pow((interest / 100 / 12) + 1, periodMonths))));
		}
	}

	/**
	 * Prepare object to send to API
	 * @param incomeInfo
	 * @returns number
	 */
	private prepareDto(incomeInfo: IncomeInfo): IncomeInfo {
		if (incomeInfo == null) throw new Error();

		incomeInfo.monthlyIncome = (incomeInfo.monthlyIncome * 1000);
		incomeInfo.requestedAmount = (incomeInfo.requestedAmount * 1000);

		return incomeInfo;
	}

}
