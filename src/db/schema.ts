import { createId } from "@paralleldrive/cuid2";
import { defineRelations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
    profileId: text("profile_id").notNull(),
    label: text("label").notNull().default(""),
    running: integer("running", { mode: "boolean" }).notNull().default(false),
});

export const timerDataTable = sqliteTable("timer_data", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    timerId: text("timer_id").notNull(),
    dataType: text("data_type").notNull(), // start | pause | reset
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
