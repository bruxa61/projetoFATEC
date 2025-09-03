import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  userType: text("user_type").notNull(), // 'entrepreneur' | 'student'
  createdAt: timestamp("created_at").defaultNow(),
});

export const entrepreneurs = pgTable("entrepreneurs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const studentGroups = pgTable("student_groups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  representativeName: text("representative_name").notNull(),
  email: text("email").notNull(),
  ra: text("ra").notNull(),
  semester: integer("semester").notNull(),
  members: text("members").notNull(), // JSON string of members
  interests: text("interests").notNull(), // JSON string of interest areas
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entrepreneurId: varchar("entrepreneur_id").references(() => entrepreneurs.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  projectType: text("project_type").notNull(), // 'web_system' | 'mobile_app' | 'landing_page' | 'ecommerce' | 'other'
  businessArea: text("business_area").notNull(),
  deadline: text("deadline").notNull(), // '1_month' | '1_3_months' | '3_6_months' | '6_plus_months'
  complexity: text("complexity").notNull(), // 'basic' | 'intermediate' | 'advanced'
  technologies: text("technologies").notNull(), // JSON string of required technologies
  status: text("status").notNull().default('available'), // 'available' | 'in_progress' | 'completed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectInterests = pgTable("project_interests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id).notNull(),
  studentGroupId: varchar("student_group_id").references(() => studentGroups.id).notNull(),
  message: text("message"),
  status: text("status").notNull().default('pending'), // 'pending' | 'accepted' | 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location").notNull(),
  status: text("status").notNull().default('upcoming'), // 'upcoming' | 'completed'
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertEntrepreneurSchema = createInsertSchema(entrepreneurs).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const insertStudentGroupSchema = createInsertSchema(studentGroups).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  entrepreneurId: true,
  status: true,
  createdAt: true,
});

export const insertProjectInterestSchema = createInsertSchema(projectInterests).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  status: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Entrepreneur = typeof entrepreneurs.$inferSelect;
export type InsertEntrepreneur = z.infer<typeof insertEntrepreneurSchema>;

export type StudentGroup = typeof studentGroups.$inferSelect;
export type InsertStudentGroup = z.infer<typeof insertStudentGroupSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type ProjectInterest = typeof projectInterests.$inferSelect;
export type InsertProjectInterest = z.infer<typeof insertProjectInterestSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

// Extended types for API responses
export type ProjectWithEntrepreneur = Project & {
  entrepreneur: Entrepreneur;
  interestCount: number;
};

export type ProjectInterestWithDetails = ProjectInterest & {
  project: Project;
  studentGroup: StudentGroup;
};
