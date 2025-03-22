import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { v7 as  uuidv7 } from "uuid";

// Role Table
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  activeStatus: boolean("active_status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").$default(() => uuidv7()),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Organizations Table
export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").$default(() => uuidv7()),
  name: varchar("name", { length: 255 }).unique().notNull(),
  description: text("description"),
  logo: varchar("logo", { length: 255 }),
  activeStatus: boolean("active_status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Teams Table
export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  activeStatus: boolean("active_status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User_Organization Table (Many-to-Many)
export const userOrgTeamRoleMapping = pgTable(
  "user_org_team_role_mp",
  {
    id: serial("id").primaryKey(),
    usersId: integer("users_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    organizationsId: integer("organizations_id").references(
      () => organizations.id,
      { onDelete: "cascade" }
    ),
    teamsId: integer("teams_id").references(() => teams.id, {
      onDelete: "cascade",
    }),
    rolesId: integer("roles_id").references(() => roles.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_user_org_team_role_mp_users_id").on(
      table.usersId,
      table.organizationsId,
      table.teamsId,
      table.rolesId
    ),
  ]
);

// Permissions Table
export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  can_create: boolean("can_create").default(false),
  can_read: boolean("can_read").default(false),
  can_update: boolean("can_update").default(false),
  can_delete: boolean("can_delete").default(false),
  can_view_history: boolean("can_view_history").default(false),
  can_grant_roles: boolean("can_grant_roles").default(false),
  description: text("description"),
  activeStatus: boolean("active_status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Role_Permissions Table
export const rolePermissions = pgTable("role_permissions", {
  id: serial("id").primaryKey(),
  rolesId: integer("roles_id").references(() => roles.id, {
    onDelete: "cascade",
  }),
  permissionsId: integer("permissions_id").references(() => permissions.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
