import { db } from "@/db/db";
import { timerProfilesTable, timerTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";

export async function getProfiles() {
    try {
        const timerProfiles = await db.query.timerProfilesTable.findMany({
            with: {
                timers: {
                    with: {
                        data: {
                            limit: 1,
                            orderBy: {
                                timestamp: "desc",
                            },
                        },
                    },
                },
            },
        });
        if (!timerProfiles) return [];
        return timerProfiles;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function handleCreateProfile() {
    try {
        const res = await db
            .insert(timerProfilesTable)
            .values({
                name: "New Profile",
            })
            .returning();

        if (!res) return null;

        return res;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const stringSchema = z.string();

export async function handleCreateTimer(profileId: string, label: string) {
    const safeLabel = stringSchema.safeParse(label);

    try {
        const res = await db
            .insert(timerTable)
            .values({
                profileId,
                label: safeLabel.success ? safeLabel.data : "New Timer",
            })
            .returning();
        if (!res) return;
        return res;
    } catch (err) {
        console.error(err);
        return;
    }
}

export async function deleteTimer(timerId: string) {
    try {
        const res = await db
            .delete(timerTable)
            .where(eq(timerTable.id, timerId))
            .returning();
        return res;
    } catch (err) {
        console.error(err);
        return;
    }
}
