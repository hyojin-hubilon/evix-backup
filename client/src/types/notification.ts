export interface NotificationResponse {
    notification_no: number;
    notification_type: string;
    notification_content: string;
    recipient_user_no: number;
    checked_user_no: number | null;
    checked_at: string | null;
    created_user_no: number;
    created_at: string;
}
