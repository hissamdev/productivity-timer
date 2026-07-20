import { timerDataTable, timerProfilesTable, timerTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Timer = InferSelectModel<typeof timerTable>;
export type Profile = InferSelectModel<typeof timerProfilesTable>;
export type TimerData = InferSelectModel<typeof timerDataTable>;

export type TimerWithData = Timer & {
    data: TimerData[];
};

export type ProfileWithTimers = Profile & {
    timers: TimerWithData[];
};
