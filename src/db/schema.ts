import { createId } from "@paralleldrive/cuid2";
import { defineRelations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const timerProfilesTable = sqliteTable("timer_profiles", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text("name").notNull().default("New Profile"),
    desc: text("desc"),
    lastUsed: integer("last_used", { mode: "timestamp" }).$defaultFn(
        () => new Date(),
    ),
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
    type: text("data_type")
        .notNull()
        .$type<"start" | "pause" | "resume" | "reset">(),
    timestamp: integer("timestamp", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    elapsedTotal: integer("elapsed_total").notNull(),
    pausedTotal: integer("paused_total").notNull(),
});

export const propertiesTable = sqliteTable("properties", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    label: text("label"),
    type: text("type").notNull().$type<"checkbox" | "dropdown">(),
    color: text("color").notNull().default("#3B82F6"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .notNull()
        .$defaultFn(() => new Date()),
});

export const propertyDataTable = sqliteTable("property_data", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    propertyId: text("property_id").notNull(),
    triggeredAt: integer("triggered_at", { mode: "timestamp_ms" })
        .notNull()
        .$defaultFn(() => new Date()),
    manualTime: integer("manual_time", { mode: "timestamp" }),
});

export const relations = defineRelations(
    {
        timerProfilesTable,
        timerTable,
        timerDataTable,
        propertiesTable,
        propertyDataTable,
    },
    (r) => ({
        timerProfilesTable: {
            timers: r.many.timerTable(),
        },
        timerTable: {
            profile: r.one.timerProfilesTable({
                from: r.timerTable.profileId,
                to: r.timerProfilesTable.id,
            }),
            data: r.many.timerDataTable(),
        },
        timerDataTable: {
            timer: r.one.timerTable({
                from: r.timerDataTable.timerId,
                to: r.timerTable.id,
            }),
        },
        propertiesTable: {
            data: r.many.propertyDataTable(),
        },
        propertyDataTable: {
            property: r.one.propertiesTable({
                from: r.propertyDataTable.propertyId,
                to: r.propertiesTable.id,
            }),
        },
    }),
);
