export interface HelpSubs {
	subTitle? : string;
	description?: string;
	exTitle? : string;
	exList? : string[];
}

export interface HelpContents {
	title? : string;
	description?: string;
	subs?: HelpSubs[]
}
export interface HelpList {
	helpTitle : string,
	contents : HelpContents[]
}
export interface Helps {
	tab : string;
	helpList : HelpList[];
}