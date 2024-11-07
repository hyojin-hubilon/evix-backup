export type ItemContents = {
	title: string;
	label?:string;
	options?: Array<string>;
	placeholder?: string;
	description?:string;
	required?:boolean // default = false?;
}

export type ItemType = {
	id?:string; //draggableid, key로 사용, json 저장시에는 삭제
	itemType: string;
	content?: ItemContents;
	columnFirst?: {
		[x: string]: ItemType[]
	},
	columnSecond?: {
		[x: string]: ItemType[]
	},
	columnThird?: {
		[x: string]: ItemType[]
	},
	columnFourth?: {
		[x: string]: ItemType[]
	}
}

export type Idstype = {
	[x: string]: ItemType[] //json 저장시에는 순서대로 key를 1,2,3...으로 변경
}

export type DeletedItem = {
	id: string;
	index: number;
}
export interface CRFPostReqBody {
	crf_title: string;1
	crf_description: string;
	crf_form_json: string; //1,2,3,4... layouts, schema, views..?
}

export interface CRFPutReqBody extends CRFPostReqBody {
  crf_no: number;
}



export interface CRFPostResponse {

}