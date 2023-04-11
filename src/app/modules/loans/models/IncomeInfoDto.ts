import { ChildrenEnum } from "../enums/ChildrenEnum";
import { CoApplicantEnum } from "../enums/CoApplicantEnum";

// export interface IncomeInfoDto {
// 	monthlyIncome: number,
// 	requestedAmount: number,
// 	loanTerm: number,
// 	children: ChildrenEnum,
// 	coapplicant: CoApplicantEnum
// }

export class IncomeInfoDto {
	monthlyIncome: number;
	requestedAmount: number;
	loanTerm: number;
	children: ChildrenEnum;
	coapplicant: CoApplicantEnum;

	constructor(options: {
			monthlyIncome?: number;
			requestedAmount?: number;
			loanTerm?: number;
			children?: ChildrenEnum;
			coapplicant?: CoApplicantEnum;
		} = {}) {
		this.monthlyIncome = options.monthlyIncome || 500000;
		this.requestedAmount = options.requestedAmount || 20000000;
		this.loanTerm = options.loanTerm || 36;
		this.children = options.children || ChildrenEnum.NONE;
		this.coapplicant = options.coapplicant || CoApplicantEnum.NONE
	}
}