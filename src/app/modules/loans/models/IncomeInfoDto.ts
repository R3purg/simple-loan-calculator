import { ChildrenEnum } from "../enums/ChildrenEnum";
import { CoApplicantEnum } from "../enums/CoApplicantEnum";

export interface IncomeInfoDto {
	monthlyIncome: number,
	requestedAmount: number,
	loanTerm: number,
	children: ChildrenEnum,
	coapplicant: CoApplicantEnum
}