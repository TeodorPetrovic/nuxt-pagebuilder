import { db } from "../database/connection";
import { pages } from "../database/schema";
import type { Page } from "../database/schema";

export class PageService {
  private db: typeof db;

  constructor(database = db) {
    this.db = database;
  }

  async getAllPages(): Promise<Page[]> {
    try {
      const allPages = await this.db.select().from(pages);
      return allPages;
    } catch (error) {
      throw new Error(`Failed to fetch pages: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance - created once when server starts
export const pageService = new PageService();
