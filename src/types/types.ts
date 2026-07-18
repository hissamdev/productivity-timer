import { timerProfilesTable, timerTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Timer = InferSelectModel<typeof timerTable>;
export type Profile = InferSelectModel<typeof timerProfilesTable>;

export type ProfileWithTimers = Profile & {
    timers: Timer[];
};
