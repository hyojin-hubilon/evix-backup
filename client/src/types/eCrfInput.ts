import { CRFFormJson } from "./ecrf";

export interface ECrfPostReqBody {
	pair_no: number | undefined,
	std_no: number | undefined,
	crf_no: number | null,
	std_crf_participant_no: number | undefined,
	inspect_date: string,
	input_crf_form_json: CRFFormJson[] | null;
}