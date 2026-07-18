import { db } from "@/db/db";

export async function getProfiles() {
    try {
        const timerProfiles = await db.query.timerProfilesTable.findMany({
            with: {
                timers: true,
            },
        });
        if (!timerProfiles) return [];
        return timerProfiles;
    } catch (err) {
        console.error(err);
        return [];
    }
}
