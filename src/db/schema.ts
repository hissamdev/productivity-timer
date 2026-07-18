import { createId } from "@paralleldrive/cuid2";
import { defineRelations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const timerProfilesTable = sqliteTable("timer_profiles", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text("name").notNull(),
});

export const timerTable = sqliteTable("timer", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    label: text("label").notNull().default(""),
    profileId: text("profile_id").notNull(),
});

export const relations = defineRelations(
    { timerProfilesTable, timerTable },
    (r) => ({
        timerTable: {
            profile: r.one.timerProfilesTable({
                from: r.timerTable.profileId,
                to: r.timerProfilesTable.id,
            }),
        },
        timerProfilesTable: {
            timers: r.many.timerTable(),
        },
    }),
);
