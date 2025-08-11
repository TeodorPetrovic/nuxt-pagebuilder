import { db } from "~~/server/database/connection"
import { pages } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const allPages = await db.select().from(pages);
  return allPages;
})
