import { db } from "@/db/db";
import { timerProfilesTable } from "@/db/schema";

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
