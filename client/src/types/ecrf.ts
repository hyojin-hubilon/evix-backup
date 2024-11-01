export interface CRFPostReqBody {
	crf_title: string;
	crf_description: string;
	crf_form_json: JSON; //1,2,3,4... layouts, schema, views..?
}

export interface CRFPutReqBody extends CRFPostReqBody {
  crf_no: number;
}



export interface CRFPostResponse {

}