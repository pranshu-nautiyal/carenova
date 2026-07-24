"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { PatientId } from "./patients";

export async function setActivePatient(id: PatientId) {
  const store = await cookies();
  store.set("carenova-patient", id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/app", "layout");
}
