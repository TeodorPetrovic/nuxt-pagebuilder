import { relations } from "drizzle-orm";
import { foreignKey, int, json, mysqlTable, timestamp, tinyint, unique, varchar } from "drizzle-orm/mysql-core";

// TABLES 

export const users = mysqlTable("user", {
    user_id: int('user_id').primaryKey().autoincrement(),
    first_name: varchar('first_name', { length: 255 }).notNull(),
    last_name: varchar('last_name', { length: 255 }).notNull(),
    username: varchar('username', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    is_verified: tinyint('is_verified').notNull().default(0),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
}, (table) => [
    unique("uq_user_username").on(table.username),
    unique("uq_user_email").on(table.email),
]);

export const pages = mysqlTable("page", {
    page_id: int("page_id").primaryKey().autoincrement(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    components: json("components").notNull(),
    meta: json("meta").notNull(),
    seo: json("seo").notNull(),
    version: int("version").notNull().default(1),
    created_by: int("created_by").notNull().references(() => users.user_id),
    modified_by: int("modified_by").notNull().references(() => users.user_id),
    published_at: timestamp("published_at").notNull().defaultNow(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
}, (table) => [
    unique("uq_page_slug").on(table.slug),
    foreignKey({
        name: "fk_page_created_by",
        columns: [table.created_by],
        foreignColumns: [users.user_id],
    }).onDelete("restrict").onUpdate("cascade"),
    foreignKey({
        name: "fk_page_modified_by",
        columns: [table.modified_by],
        foreignColumns: [users.user_id],
    }).onDelete("restrict").onUpdate("cascade"),
]);

export const pageDrafts = mysqlTable("page_draft", {
    page_draft_id: int("page_draft_id").primaryKey().autoincrement(),
    page_id: int("page_id").notNull().references(() => pages.page_id),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    components: json("components").notNull(),
    meta: json("meta").notNull(),
    seo: json("seo").notNull(),
    version: int("version").notNull().default(1),
    created_by: int("created_by").notNull().references(() => users.user_id),
    modified_by: int("modified_by").notNull().references(() => users.user_id),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
}, (table) => [
    unique("uq_page_draft_slug").on(table.slug),
    foreignKey({
        name: "fk_page_draft_created_by",
        columns: [table.created_by],
        foreignColumns: [users.user_id],
    }).onDelete("restrict").onUpdate("cascade"),
    foreignKey({
        name: "fk_page_draft_modified_by",
        columns: [table.modified_by],
        foreignColumns: [users.user_id],
    }).onDelete("restrict").onUpdate("cascade"),
]);

export const pageHistories = mysqlTable("page_history", {
    page_history_id: int("page_history_id").primaryKey().autoincrement(),
    page_id: int("page_id").notNull().references(() => pages.page_id),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    components: json("components").notNull(),
    meta: json("meta").notNull(),
    seo: json("seo").notNull(),
    version: int("version").notNull().default(1),
    created_by: int("created_by").notNull().references(() => users.user_id),
    modified_by: int("modified_by").notNull().references(() => users.user_id),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
}, (table) => [
    unique("uq_page_history_slug").on(table.slug),
    foreignKey({
        name: "fk_page_history_created_by",
        columns: [table.created_by],
        foreignColumns: [users.user_id],
    }).onDelete("restrict").onUpdate("cascade"),
    foreignKey({
        name: "fk_page_history_modified_by",
        columns: [table.modified_by],
        foreignColumns: [users.user_id],
    }).onDelete("restrict").onUpdate("cascade"),
]);

// TABLES 

//RELATIONS

// BROKEN DOES NOT WORK
export const userRelations = relations(users, ({ many }) => ({
    createdPages: many(pages, { relationName: "createdPages" }),
    modifiedPages: many(pages, { relationName: "modifiedPages" }),
    createdPageDrafts: many(pageDrafts, { relationName: "createdPageDrafts" }),
    modifiedPageDrafts: many(pageDrafts, { relationName: "modifiedPageDrafts" }),
    createdPageHistories: many(pageHistories, { relationName: "createdPageHistories" }),
    modifiedPageHistories: many(pageHistories, { relationName: "modifiedPageHistories" }),
}));

export const pageRelations = relations(pages, ({ one }) => ({
    createdByUser: one(users, {
        fields: [pages.created_by],
        references: [users.user_id],
        relationName: "createdPages"
    }),
    modifiedByUser: one(users, {
        fields: [pages.modified_by],
        references: [users.user_id],
        relationName: "modifiedPages"
    }),
    createdPageDrafts: one(pageDrafts, {
        fields: [pages.page_id],
        references: [pageDrafts.page_id],
        relationName: "createdPageDrafts"
    }),
    modifiedPageDrafts: one(pageDrafts, {
        fields: [pages.page_id],
        references: [pageDrafts.page_id],
        relationName: "modifiedPageDrafts"
    }),
    createdPageHistories: one(pageHistories, {
        fields: [pages.page_id],
        references: [pageHistories.page_id],
        relationName: "createdPageHistories"
    }),
    modifiedPageHistories: one(pageHistories, {
        fields: [pages.page_id],
        references: [pageHistories.page_id],
        relationName: "modifiedPageHistories"
    }),
}));

//RELATIONS


// TYPES

export type Page = typeof pages.$inferSelect;
export type PageInsert = typeof pages.$inferInsert;
export type PageDraft = typeof pageDrafts.$inferSelect;
export type PageDraftInsert = typeof pageDrafts.$inferInsert;
export type PageHistory = typeof pageHistories.$inferSelect;
export type PageHistoryInsert = typeof pageHistories.$inferInsert;
export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

// TYPES