import { Observable, tap } from 'rxjs';
import { IncomeInfoDto } from '../models/IncomeInfoDto';
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
	calculateLoan(incomeInfo: IncomeInfoDto): Observable<LoanInfo> {
		console.log('incomeInfo: ', incomeInfo);
		
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

}
