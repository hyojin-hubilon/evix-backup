// 스터디별 누적 참여자 수(배포 상태인 스터디)
export interface NumOfParticipantByStudy {
    std_no: number;
    std_type: string;
    title: string;
    target_number: number;
    number_participant: number;
    participation_late: number;
}

// 월별 스터디 참여자 수 (6개월) (배포 상태인 스터디)
export interface StudyGoalByMonthly {
    std_no: number;
    current_month: string;
    num_current_month: number;
    ago_1_month: string;
    num_ago_1_month: number;
    ago_2_month: string;
    num_ago_2_month: number;
    ago_3_month: string;
    num_ago_3_month: number;
    ago_4_month: string;
    num_ago_4_month: number;
    ago_5_month: string;
    num_ago_5_month: number;
}

// 주간 스터디 참여자 수(배포 상태인 스터디)
export interface WeeklyByStudy {
    std_no: number;
    title: string;
    current_day: string;
    num_current_day: number;
    ago_1_day: string;
    num_ago_1_day: number;
    ago_2_day: string;
    num_ago_2_day: number;
    ago_3_day: string;
    num_ago_3_day: number;
    ago_4_day: string;
    num_ago_4_day: number;
    ago_5_day: string;
    num_ago_5_day: number;
    ago_6_day: string;
    num_ago_6_day: number;
    ago_7_day: string;
    num_ago_7_day: number;
}

// 최근 참여자 로그 (배포 상태인 스터디)
export interface RecentParticipantLogs {
    std_no: number;
    participant_no: number;
    study_title: string;
    full_name: string;
    birthday: string;
    created_at: string; //<< update date 항목에 노출해주시면 됩니다.
    number_answer: number;
    total_number_survey: number;
    participation_status: 'PROGRESS' | 'COMPLETE';
}

// 주간 스터디 참여자 수, 차트 타입
export interface WeeklyByStudyChart {
    name: string;
    data: number[];
}

// 월별 스터디 참여자 수, 차트 타입
type ParticipantData = [number, number];
export interface StudyGoalByMonthlyChart {
    name: string;
    data: number[][];
}
