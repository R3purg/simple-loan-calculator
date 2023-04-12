import { ChildrenEnum } from "../enums/ChildrenEnum";
import { CoApplicantEnum } from "../enums/CoApplicantEnum";

export class IncomeInfo {
	monthlyIncome: number;
	requestedAmount: number;
	loanTerm: number;
	children: string;
	coapplicant: string;

	constructor (options: {
			monthlyIncome?: number;
			requestedAmount?: number;
			loanTerm?: number;
			children?: string;
			coapplicant?: string;
		} = {}) {
		this.monthlyIncome = (options.monthlyIncome ?? 500);
		this.requestedAmount = (options.requestedAmount ?? 20000);
		this.loanTerm = options.loanTerm ?? 36;
		this.children = options.children ?? ChildrenEnum[ChildrenEnum.NONE];
		this.coapplicant = options.coapplicant ?? CoApplicantEnum[CoApplicantEnum.NONE]
	}
}