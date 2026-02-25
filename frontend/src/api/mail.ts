import { request } from './http';

export interface MailPayload {
    name: string;
    email: string;
}

export interface MailResponse {
    ok: boolean;
    message?: string;
}

export function sendWaitlistMail(payload: MailPayload) {
    return request<MailResponse>('/api/finnova-send-mail', {
        method: 'POST',
        body: payload
    });
}