import { db } from "@/db/db";
import { timerDataTable } from "@/db/schema";
import { TimerData } from "@/types/types";

export async function handleTimerData(
    timerId: string,
    type: "start" | "pause" | "resume" | "reset",
    lastData: TimerData,
) {
    // on "start" set it to 0
    // on "pause" subtract last timestamp from this one, and set the elapsed time
    // on "resume" do same as above, but store it in paused_total
    // on "reset", if last one was pause, then save it to pause total
    const currentTime = new Date();
    const elapsed =
        (new Date().getTime() - lastData?.timestamp.getTime()) / 1000;

    if (type === "start") {
        try {
            const res = await db
                .insert(timerDataTable)
                .values({
                    timerId,
                    type,
                    timestamp: currentTime,
                    elapsedTotal: 0,
                    pausedTotal: 0,
                })
                .returning();
            return res;
        } catch (err) {
            console.error(err);
            return;
        }
    } else if (type === "pause") {
        try {
            const res = await db
                .insert(timerDataTable)
                .values({
                    timerId,
                    type,
                    elapsedTotal: lastData.elapsedTotal + elapsed,
                    pausedTotal: lastData.pausedTotal,
                })
                .returning();
            return res;
        } catch (err) {
            console.error(err);
            return;
        }
    } else if (type === "resume") {
        try {
            const res = await db
                .insert(timerDataTable)
                .values({
                    timerId,
                    type,
                    elapsedTotal: lastData.elapsedTotal,
                    pausedTotal: lastData.pausedTotal + elapsed,
                })
                .returning();
            return res;
        } catch (err) {
            console.error(err);
            return;
        }
    } else {
        try {
            const res = await db.insert(timerDataTable).values({
                timerId,
                type,
                elapsedTotal:
                    lastData.type !== "pause"
                        ? lastData.elapsedTotal + elapsed
                        : lastData.elapsedTotal,
                pausedTotal:
                    lastData.type === "pause"
                        ? lastData.pausedTotal + elapsed
                        : lastData.pausedTotal,
            });
        } catch (err) {
            console.log(err);
        }
    }
}
