// src/api/types.ts
export type WaitlistPayload = {
  name: string;
  phone: string;
  email: string;
  age: number;
  updatesOptIn: boolean;
};

export type WaitlistResponse = {
  ok: boolean;
  message: string;
};
