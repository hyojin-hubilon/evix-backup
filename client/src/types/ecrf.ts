export type ItemContents = {
	title: string;
	label?:string;
	options?: Array<string>;
	placeholder?: string;
	description?:string;
	required?:boolean // default = false?;
}

export type ItemType = {
	id:string; //draggableid, key로 사용, json 저장시에는 삭제
	itemType: string;
	content: ItemContents;
}

export type SelectedItem = {
	columnId:string;
	index: number;
} & ItemType;

export type Idstype = {
	[x: string]: ItemType[] //json 저장시에는 순서대로 key를 1,2,3...으로 변경
}

export type DeletedItem = {
	id: string;
	index: number;
}
export interface CRFFormJson {
	[x:number] : [{[x:number] : ItemType[]}]
}
export interface CRFPostReqBody {
	crf_title: string;
	crf_description: string;
	crf_form_json: CRFFormJson[]; //1,2,3,4... layouts, schema, views..?
}

export interface CRFPutReqBody extends CRFPostReqBody {
  crf_no: number;
}



export interface CRFPostResponse {

}

export interface MyCRFList {
	created_at: string | Date;
	created_user_no:number;
	crf_no:number;
	crf_title:string;
	std_no:number | null;
	std_status:string | null;
	std_title:string | null;
	std_type:string | null;
	sort:number;
}

export interface StudyCrfListRespone {
	pair_no: number; //post 할때 pair_no는 필요없는 걸까..
	std_no: number,
	crf_no: number,
	crf_title: string,
	sort: number
}

export interface StudyCrfPairPostBody {
	std_no: number,
    crf_no: number,
    sort: number
}


export interface StudyCrfPairDeleteBody {
	pair_no: number,
    std_no: number   
}