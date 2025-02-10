import { CRFFormJson } from "./ecrf";

export interface ECrfPostReqBody {
	pair_no: number | undefined,
	std_no: number | undefined,
	crf_no: number | null,
	std_crf_participant_no: number | undefined,
	inspect_date: string,
	input_crf_form_json: CRFFormJson[] | null;
}

export interface InputCrfList {
	created_at: string | Date  | null;
	created_user_no: number | null;
	crf_input_no: number | null;
	crf_no:number  | null;
	input_date: string| Date  | null;
	input_turn: number | null;
	inspect_date: string | Date | null;
	pair_no:number | null;
	std_crf_participant_no:number | null;
	std_no: number | null;
	updated_at: string | Date | null;
	updated_user_no : number | null;
}