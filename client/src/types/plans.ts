export interface SiteForControlPlan {
    value: string;
    name: string;
}

export interface ControlPlan {
    applicators: string[];
    contract_no: string;
    end_date: string;
    option_year_id: number;
    program_id: number;
    program_name: string;
    site: SiteForControlPlan[];
    start_date: string;
    task_order: string;
    tdr_count: number;
    treatment_id: number;
    treatment_name: string;
    method: {name: string; treatment_method_id: number}[];
    species: {name: string; species_id: number}[];
}

export interface ControlPlanRes {
    success: boolean;
    data: ControlPlan[];
}

export interface ControlPlanParams {
    treatment_id:number;
    start_date: string | Date;
    end_Date: string | Date;
}

export interface DailyReportByControlPlan {
    tdr_id: string;
    tdr_weekly_id: string | null;
    treatment_id: number;    
    report_date: string;
    title: string;
    applicator_name: string;
    creator_name: string;
    total_hours: string | number;
    total_treated: string | number;
    total_covered: string | number;
    method_name: string;
    species_name:string;
    site_name:string;
}
export interface ControlPlanFile { 
    created_on:Date;
    extension:string;
    file_id:string;
    geolocation:string;
    location:string;
    name:string;
    path:string;
    size:number;
    thumbnail:string;
}