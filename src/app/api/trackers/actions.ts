"use server";

import { getSession } from "@/auth/lib";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function addTracker(prevState: any, formData: FormData) {
    const session = await getSession();
    if (!session) return { message: "You are not authorized." };

    if (formData.get("tracker-name") == "") {
        return { message: "Please provide a name for your tracker." };
    }

    if ((formData.get("tracker-description")?.toString() || "").length > 200) {
        return { message: "Please reduce the length of the description to less than 200 characters." };
    }

    // validate name collision by user
    const query = 'SELECT * FROM "Tracker" WHERE name = $1 AND userid = $2;';
    const params = [formData.get("tracker-name"), session.user.id];
    const { rows: existingTrackersWithNameByUser } = await sql.query(query, params);

    if(existingTrackersWithNameByUser.length != 0) {
        return { message: "You already have a tracker with this name." };
    }

    const query2 = 'INSERT INTO "Tracker" (name, description, userid) VALUES ($1, $2, $3);';
    const params2 = [formData.get("tracker-name"), formData.get("tracker-description"), session.user.id];
    const { rows: result } = await sql.query(query2, params2);

    revalidatePath("/");

    return { state: "success" }
}