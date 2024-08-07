// 스터디별 누적 참여자 수(배포 상태인 스터디)
export interface NumOfParticipantByStudy {
    std_no: number;
    std_type: string;
    title: string;
    target_number: number;
    number_participant: number;
    participation_late: number;
}

