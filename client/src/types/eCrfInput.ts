import { CRFFormJson } from "./ecrf";

export interface ECrfPostReqBody {
	pair_no: number | undefined,
	std_no: number | undefined,
	crf_no: number | null,
	std_crf_participant_no: number | undefined,
	inspect_date: string,
	input_crf_form_json: CRFFormJson[] | null;
}

export interface AttachmentList {
	attachment_file_extension : string;
	attachment_file_name: string;
	attachment_file_origin_name : string;
	attachment_file_size : number;
	case_report_form_input_attachment_file_no: number;
	crf_input_no: number;
}

export interface InputCrfDetail  {
	attachment_list : AttachmentList[];
	created_at: string | Date;
	created_user_no: number
	crf_input_no: number;
	crf_no: number;
	input_crf_form_json:  CRFFormJson[];
	input_date: string | Date;
	input_turn: number;
	inspect_date: string | Date;
	pair_no: number;
	std_crf_participant_no: number;
	std_no: number;
	updated_at: string | Date | null;
	updated_user_no: number | null;
}

export interface InputCrfList {
	created_at: string | Date;
	created_user_no: number;
	crf_input_no: number;
	crf_no:number;
	input_date: string| Date;
	input_turn: number;
	inspect_date: string | Date;
	pair_no:number;
	std_crf_participant_no:number;
	std_no: number;
	updated_at: string | Date | null;
	updated_user_no : number | null;
}