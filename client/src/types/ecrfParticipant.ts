
export interface ECrfParticipantReqBody {
	std_no: number,
	full_name: string,
	gender: string, // "female" | "male"
	birthday: string;
}

export interface ECrfParticipantPutReqBody extends ECrfParticipantReqBody {
	std_crf_participant_no: number
}

export interface ECrfParticipantDelete {
	std_crf_participant_no: number,
	std_no:number
}

export interface ECrfParticipant {
	std_no:number;
	birthday: string;
	created_at: string | Date;
	created_user_no?: number;
	full_name: string;
	gender: string;
	signature_eic_extension?: 'Y' | 'N' | null;
	signature_eic_name?: string | null;
	std_crf_participant_no: number;
	number_crf_input:number;
	allotment_agency_name:string;
	age: number;
}