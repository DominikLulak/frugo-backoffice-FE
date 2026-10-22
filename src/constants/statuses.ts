export const STATUSES = [
    "ENTERED",
    "RELEASE",
    "BLOCKED",
    "COMPLETED",
    "CANCELED",
    "FINISHED"
] as const;

export type Statuses = (typeof STATUSES)[number];