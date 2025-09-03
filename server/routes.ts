import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertEntrepreneurSchema, 
  insertStudentGroupSchema, 
  insertProjectSchema,
  insertProjectInterestSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all projects with filters
  app.get("/api/projects", async (req, res) => {
    try {
      const { projectType, businessArea, deadline, complexity } = req.query;
      
      const projects = await storage.getProjectsWithFilters({
        projectType: projectType as string,
        businessArea: businessArea as string,
        deadline: deadline as string,
        complexity: complexity as string,
      });

      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const entrepreneur = await storage.getEntrepreneur(project.entrepreneurId);
      const interests = await storage.getProjectInterestsByProject(project.id);

      res.json({
        ...project,
        entrepreneur,
        interests
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Create entrepreneur registration
  app.post("/api/entrepreneurs", async (req, res) => {
    try {
      const validatedData = insertEntrepreneurSchema.parse(req.body);
      
      // Create user account
      const user = await storage.createUser({
        username: validatedData.email,
        password: "temp_password", // In real app, would hash password
        userType: "entrepreneur"
      });

      // Create entrepreneur profile
      const entrepreneur = await storage.createEntrepreneur({
        ...validatedData,
        userId: user.id
      });

      res.status(201).json(entrepreneur);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create entrepreneur" });
    }
  });

  // Create student group registration
  app.post("/api/student-groups", async (req, res) => {
    try {
      const validatedData = insertStudentGroupSchema.parse(req.body);
      
      // Create user account
      const user = await storage.createUser({
        username: validatedData.email,
        password: "temp_password", // In real app, would hash password
        userType: "student"
      });

      // Create student group profile
      const studentGroup = await storage.createStudentGroup({
        ...validatedData,
        userId: user.id
      });

      res.status(201).json(studentGroup);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create student group" });
    }
  });

  // Create project
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const { entrepreneurId } = req.body;

      if (!entrepreneurId) {
        return res.status(400).json({ message: "Entrepreneur ID is required" });
      }

      const project = await storage.createProject({
        ...validatedData,
        entrepreneurId
      });

      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Express interest in project
  app.post("/api/project-interests", async (req, res) => {
    try {
      const validatedData = insertProjectInterestSchema.parse(req.body);
      
      const interest = await storage.createProjectInterest(validatedData);

      res.status(201).json(interest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to express interest" });
    }
  });

  // Get all events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Get upcoming events
  app.get("/api/events/upcoming", async (req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming events" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
