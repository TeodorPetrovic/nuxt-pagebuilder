import { pageService } from "~~/server/services/pageService";
import { handleError } from "~~/server/errors/response";

export default defineEventHandler(async (event) => {
  try {
    const allPages = await pageService.getAllPages();
    return allPages;
  } catch (error) {
    return handleError(event, error);
  }
})
