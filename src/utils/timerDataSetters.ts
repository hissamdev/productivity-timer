import { db } from "@/db/db";
import { timerDataTable, timerTable } from "@/db/schema";

export async function handleTimerData(
    timerId: string,
    type: "start" | "pause" | "resume" | "reset",
) {
    if (type === "start") {
        try {
            await db.update(timerTable).set({
                running: true,
            });
        } catch (err) {
            console.error(err);
            return;
        }
    }

    try {
        const res = await db
            .insert(timerDataTable)
            .values({
                timerId,
                type,
                timestamp: new Date(),
            })
            .returning();
        if (!res) return;

        return res;
    } catch (err) {
        console.error(err);
        return;
    }
}
