CREATE TABLE "organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid,
	"name" varchar(255) NOT NULL,
	"description" text,
	"logo" varchar(255),
	"active_status" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "organizations_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"can_create" boolean DEFAULT false,
	"can_read" boolean DEFAULT false,
	"can_update" boolean DEFAULT false,
	"can_delete" boolean DEFAULT false,
	"can_view_history" boolean DEFAULT false,
	"can_grant_roles" boolean DEFAULT false,
	"description" text,
	"active_status" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "permissions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"roles_id" integer,
	"permissions_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"active_status" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"active_status" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_org_team_role_mp" (
	"id" serial PRIMARY KEY NOT NULL,
	"users_id" integer,
	"organizations_id" integer,
	"teams_id" integer,
	"roles_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"full_name" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roles_id_roles_id_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissions_id_permissions_id_fk" FOREIGN KEY ("permissions_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_org_team_role_mp" ADD CONSTRAINT "user_org_team_role_mp_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_org_team_role_mp" ADD CONSTRAINT "user_org_team_role_mp_organizations_id_organizations_id_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_org_team_role_mp" ADD CONSTRAINT "user_org_team_role_mp_teams_id_teams_id_fk" FOREIGN KEY ("teams_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_org_team_role_mp" ADD CONSTRAINT "user_org_team_role_mp_roles_id_roles_id_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_user_org_team_role_mp_users_id" ON "user_org_team_role_mp" USING btree ("users_id","organizations_id","teams_id","roles_id");