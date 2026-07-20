import { db } from "@/db/db";
import { timerProfilesTable, timerTable } from "@/db/schema";

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

export async function handleCreateTimer(profileId: string) {
    try {
        const res = await db
            .insert(timerTable)
            .values({
                profileId,
                label: "New Timer",
            })
            .returning();
        if (!res) return;
        return res;
    } catch (err) {
        console.error(err);
        return;
    }
}
