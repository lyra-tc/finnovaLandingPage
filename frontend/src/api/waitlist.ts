// src/api/waitlist.ts
import { request } from "./http";
import type { WaitlistPayload, WaitlistResponse } from "./types";

export function postWaitlist(payload: WaitlistPayload) {
    return request<WaitlistResponse>("/waitlist", {
        method: "POST",
        body: payload,
    });
}