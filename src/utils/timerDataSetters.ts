import { db } from "@/db/db";
import { timerDataTable } from "@/db/schema";

export async function handleTimerData(
    timerId: string,
    type: "start" | "pause" | "resume" | "reset",
) {
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
