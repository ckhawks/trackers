"use server";

import { getSession } from "@/auth/lib";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTracker(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session) return { message: "You are not authorized." };

  if (formData.get("tracker-name") == "") {
    return { message: "Please provide a name for your tracker." };
  }

  if ((formData.get("tracker-description")?.toString() || "").length > 200) {
    return {
      message:
        "Please reduce the length of the description to less than 200 characters.",
    };
  }

  // validate name collision by user
  const query = 'SELECT * FROM "Tracker" WHERE name = $1 AND userid = $2;';
  const params = [formData.get("tracker-name"), session.user.id];
  const { rows: existingTrackersWithNameByUser } = await sql.query(
    query,
    params
  );

  if (existingTrackersWithNameByUser.length != 0) {
    return { message: "You already have a tracker with this name." };
  }

  const query2 =
    'INSERT INTO "Tracker" (name, description, userid, focus) VALUES ($1, $2, $3, $4);';
  const params2 = [
    formData.get("tracker-name"),
    formData.get("tracker-description"),
    session.user.id,
    formData.get("tracker-focus"),
  ];
  const { rows: result } = await sql.query(query2, params2);

  revalidatePath("/");

  return { state: "success" };
}

export async function editTracker(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session) return { message: "You are not authorized." };

  if (formData.get("tracker-name") == "") {
    return { message: "Please provide a name for your tracker." };
  }

  if ((formData.get("tracker-description")?.toString() || "").length > 200) {
    return {
      message:
        "Please reduce the length of the description to less than 200 characters.",
    };
  }

  // validate tracker exists
  const query = 'SELECT * FROM "Tracker" WHERE id = $1 AND userid = $2;';
  const params = [formData.get("trackerId"), session.user.id];
  const { rows: existingTrackersById } = await sql.query(query, params);

  if (existingTrackersById.length == 0) {
    return { message: "We couldn't find that tracker somehow. Error type 3" };
  }

  //   console.log("existing", existingTrackersById);

  const query2 =
    'UPDATE "Tracker" SET name = $1, description = $2, focus = $5 WHERE id = $3 AND userid = $4;';
  const params2 = [
    formData.get("tracker-name"),
    formData.get("tracker-description"),
    formData.get("trackerId"),
    session.user.id,
    formData.get("tracker-focus"),
  ];
  const { rows: result } = await sql.query(query2, params2);

  //   console.log("result", result);

  revalidatePath("/");
  revalidatePath("/tracker/" + formData.get("trackerId"));

  return { state: "success" };
}

export async function deleteTracker(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session) return { message: "You are not authorized." };

  if (formData.get("trackerId") == "") {
    return {
      message: "Somehow the id for your tracker was missing from the request.",
    };
  }

  if ((formData.get("tracker-description")?.toString() || "").length > 200) {
    return {
      message:
        "Please reduce the length of the description to less than 200 characters.",
    };
  }

  const query = 'DELETE FROM "Tracker" t WHERE t.id = $1;';
  const params = [formData.get("trackerId")];
  const { rows: result } = await sql.query(query, params);

  //   console.log("result", result);

  // validate name collision by user
  // const query = 'SELECT * FROM "Tracker" WHERE name = $1 AND userid = $2;';
  // const params = [formData.get("tracker-name"), session.user.id];
  // const { rows: existingTrackersWithNameByUser } = await sql.query(query, params);

  // if(existingTrackersWithNameByUser.length != 0) {
  //     return { message: "You already have a tracker with this name." };
  // }

  // const query2 = 'INSERT INTO "Tracker" (name, description, userid) VALUES ($1, $2, $3);';
  // const params2 = [formData.get("tracker-name"), formData.get("tracker-description"), session.user.id];
  // const { rows: result } = await sql.query(query2, params2);

  revalidatePath("/");
  redirect("/");

  return { state: "success" };
}
