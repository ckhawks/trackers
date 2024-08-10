"use server";

import { getSession } from "@/auth/lib";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function addProgressToTracker(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session) return { message: "You are not authorized." };

  if (formData.get("progress-userid") == "") {
    return { message: "You somehow didn't provide a `userId`." };
  }

  if (formData.get("progress-userid") != session.user.id) {
    return {
      message: "You somehow are a differnt user than your session. Wtf?",
    };
  }

  if (formData.get("progress-trackerId") == "") {
    return { message: "You somehow didn't provide an `id`." };
  }

  if (formData.get("progress-points") == "") {
    return { message: "Please provide an amount of points to add." };
  }

  if (Number.parseInt(formData.get("progress-points")?.toString() || "") <= 0) {
    return { message: "Please provide an amount of points greater than 0." };
  }

  if ((formData.get("progress-summary")?.toString() || "").length > 100) {
    return {
      message:
        "Please reduce the length of the description to less than 100 characters.",
    };
  }

  // validate name collision by user
  // const query = 'SELECT * FROM "Tracker" WHERE name = $1 AND userid = $2;';
  // const params = [formData.get("tracker-name"), session.user.id];
  // const { rows: existingTrackersWithNameByUser } = await sql.query(query, params);

  // if(existingTrackersWithNameByUser.length != 0) {
  //     return { message: "You already have a tracker with this name." };
  // }

  const query2 =
    'INSERT INTO "Progress" (userid, trackerid) VALUES ($1, $2) RETURNING id;';
  const params2 = [session.user.id, formData.get("progress-trackerId")];
  const { rows: progressInsertResults } = await sql.query(query2, params2);

  // console.log(progressInsertResults);
  if (progressInsertResults.length != 1) {
    return { message: "There was an error adding progress. Error type 1" };
  }

  const progressId: number = progressInsertResults[0]?.id;

  const query3 =
    'INSERT INTO "ProgressEvent" (progressid, points, summary) VALUES ($1, $2, $3);';
  const params3 = [
    progressId,
    formData.get("progress-points"),
    formData.get("progress-summary"),
  ];
  const { rows: result3 } = await sql.query(query3, params3);

  revalidatePath("/tracker/" + formData.get("progress-trackerId"));

  return { state: "success" };
}

export async function editProgressEntry(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session) return { message: "You are not authorized." };

  if (formData.get("progress-userid") == "") {
    return { message: "You somehow didn't provide a `userId`." };
  }

  if (formData.get("progress-userid") != session.user.id) {
    return {
      message: "You somehow are a differnt user than your session. Wtf?",
    };
  }

  if (formData.get("progressId") == "") {
    return { message: "You somehow didn't provide an `progressId`." };
  }

  if (formData.get("progress-points") == "") {
    return { message: "Please provide an amount of points." };
  }

  if (Number.parseInt(formData.get("progress-points")?.toString() || "") <= 0) {
    return { message: "Please provide an amount of points greater than 0." };
  }

  if ((formData.get("progress-summary")?.toString() || "").length > 100) {
    return {
      message:
        "Please reduce the length of the description to less than 100 characters.",
    };
  }

  // validate name collision by user
  const query = 'SELECT * FROM "Progress" WHERE id = $1 AND userid = $2;';
  const params = [formData.get("progressId"), session.user.id];
  const { rows: existingProgressByIdAndUser } = await sql.query(query, params);

  if(existingProgressByIdAndUser.length == 0) {
      return { message: "Error couldn't find that associated progress :(" };
  }

  const progressId: number = existingProgressByIdAndUser[0]?.id;

  const query3 =
    'INSERT INTO "ProgressEvent" (progressid, points, summary) VALUES ($1, $2, $3);';
  const params3 = [
    progressId,
    formData.get("progress-points"),
    formData.get("progress-summary"),
  ];
  const { rows: result3 } = await sql.query(query3, params3);

  revalidatePath("/tracker/" + formData.get("progress-trackerId"));

  return { state: "success" };
}