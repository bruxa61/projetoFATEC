import { 
  type User, type InsertUser,
  type Entrepreneur, type InsertEntrepreneur,
  type StudentGroup, type InsertStudentGroup,
  type Project, type InsertProject, type ProjectWithEntrepreneur,
  type ProjectInterest, type InsertProjectInterest, type ProjectInterestWithDetails,
  type Event, type InsertEvent
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Entrepreneurs
  getEntrepreneur(id: string): Promise<Entrepreneur | undefined>;
  getEntrepreneurByUserId(userId: string): Promise<Entrepreneur | undefined>;
  createEntrepreneur(entrepreneur: InsertEntrepreneur & { userId: string }): Promise<Entrepreneur>;

  // Student Groups
  getStudentGroup(id: string): Promise<StudentGroup | undefined>;
  getStudentGroupByUserId(userId: string): Promise<StudentGroup | undefined>;
  createStudentGroup(studentGroup: InsertStudentGroup & { userId: string }): Promise<StudentGroup>;

  // Projects
  getProject(id: string): Promise<Project | undefined>;
  getProjectsWithFilters(filters: {
    projectType?: string;
    businessArea?: string;
    deadline?: string;
    complexity?: string;
  }): Promise<ProjectWithEntrepreneur[]>;
  createProject(project: InsertProject & { entrepreneurId: string }): Promise<Project>;
  updateProjectStatus(id: string, status: string): Promise<Project | undefined>;

  // Project Interests
  getProjectInterest(id: string): Promise<ProjectInterest | undefined>;
  getProjectInterestsByProject(projectId: string): Promise<ProjectInterestWithDetails[]>;
  getProjectInterestsByStudentGroup(studentGroupId: string): Promise<ProjectInterestWithDetails[]>;
  createProjectInterest(interest: InsertProjectInterest): Promise<ProjectInterest>;
  updateProjectInterestStatus(id: string, status: string): Promise<ProjectInterest | undefined>;

  // Events
  getEvent(id: string): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private entrepreneurs: Map<string, Entrepreneur>;
  private studentGroups: Map<string, StudentGroup>;
  private projects: Map<string, Project>;
  private projectInterests: Map<string, ProjectInterest>;
  private events: Map<string, Event>;

  constructor() {
    this.users = new Map();
    this.entrepreneurs = new Map();
    this.studentGroups = new Map();
    this.projects = new Map();
    this.projectInterests = new Map();
    this.events = new Map();

    // Initialize with some sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Create sample entrepreneurs
    const entrepreneur1User = await this.createUser({
      username: "carlos.mendes",
      password: "password",
      userType: "entrepreneur"
    });

    const entrepreneur1 = await this.createEntrepreneur({
      userId: entrepreneur1User.id,
      fullName: "Dr. Carlos Mendes",
      email: "carlos@veterinaria.com",
      phone: "(11) 99999-9999",
      company: "Clínica Veterinária São Paulo"
    });

    const entrepreneur2User = await this.createUser({
      username: "nutricao.vida",
      password: "password",
      userType: "entrepreneur"
    });

    const entrepreneur2 = await this.createEntrepreneur({
      userId: entrepreneur2User.id,
      fullName: "Ana Silva",
      email: "ana@nutricaovida.com",
      phone: "(11) 88888-8888",
      company: "Nutrição & Vida Ltda"
    });

    const entrepreneur3User = await this.createUser({
      username: "edutech.solutions",
      password: "password",
      userType: "entrepreneur"
    });

    const entrepreneur3 = await this.createEntrepreneur({
      userId: entrepreneur3User.id,
      fullName: "Roberto Santos",
      email: "roberto@edutech.com",
      phone: "(11) 77777-7777",
      company: "EduTech Solutions"
    });

    // Create sample projects
    await this.createProject({
      entrepreneurId: entrepreneur1.id,
      title: "Sistema de Gestão para Clínica Veterinária",
      description: "Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados.",
      projectType: "web_system",
      businessArea: "saude",
      deadline: "3_6_months",
      complexity: "intermediate",
      technologies: JSON.stringify(["React", "Node.js", "MySQL", "API REST"])
    });

    await this.createProject({
      entrepreneurId: entrepreneur2.id,
      title: "App Mobile para Delivery de Comida Saudável",
      description: "Aplicativo mobile para delivery de refeições saudáveis com sistema de recomendação personalizada, integração com pagamento e GPS para tracking de entrega. Foco em UX/UI intuitiva.",
      projectType: "mobile_app",
      businessArea: "comercio",
      deadline: "3_6_months",
      complexity: "advanced",
      technologies: JSON.stringify(["React Native", "Firebase", "Maps API", "Payment Gateway"])
    });

    await this.createProject({
      entrepreneurId: entrepreneur3.id,
      title: "Landing Page para Startup de EdTech",
      description: "Criação de landing page moderna e responsiva para captação de leads de startup focada em soluções educacionais. Necessário conhecimento em design UI/UX e otimização para conversão.",
      projectType: "landing_page",
      businessArea: "educacao",
      deadline: "1_month",
      complexity: "basic",
      technologies: JSON.stringify(["HTML/CSS", "JavaScript", "WordPress", "SEO"])
    });

    // Create sample events
    await this.createEvent({
      title: "Demo Day - 1º Semestre 2024",
      description: "Apresentação dos projetos desenvolvidos durante o semestre e networking entre empreendedores, estudantes e profissionais da área.",
      date: new Date("2024-06-15"),
      startTime: "14:00",
      endTime: "18:00",
      location: "Auditório Fatec Zona Leste"
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Entrepreneurs
  async getEntrepreneur(id: string): Promise<Entrepreneur | undefined> {
    return this.entrepreneurs.get(id);
  }

  async getEntrepreneurByUserId(userId: string): Promise<Entrepreneur | undefined> {
    return Array.from(this.entrepreneurs.values()).find(entrepreneur => entrepreneur.userId === userId);
  }

  async createEntrepreneur(entrepreneur: InsertEntrepreneur & { userId: string }): Promise<Entrepreneur> {
    const id = randomUUID();
    const newEntrepreneur: Entrepreneur = {
      ...entrepreneur,
      id,
      createdAt: new Date()
    };
    this.entrepreneurs.set(id, newEntrepreneur);
    return newEntrepreneur;
  }

  // Student Groups
  async getStudentGroup(id: string): Promise<StudentGroup | undefined> {
    return this.studentGroups.get(id);
  }

  async getStudentGroupByUserId(userId: string): Promise<StudentGroup | undefined> {
    return Array.from(this.studentGroups.values()).find(group => group.userId === userId);
  }

  async createStudentGroup(studentGroup: InsertStudentGroup & { userId: string }): Promise<StudentGroup> {
    const id = randomUUID();
    const newStudentGroup: StudentGroup = {
      ...studentGroup,
      id,
      createdAt: new Date()
    };
    this.studentGroups.set(id, newStudentGroup);
    return newStudentGroup;
  }

  // Projects
  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsWithFilters(filters: {
    projectType?: string;
    businessArea?: string;
    deadline?: string;
    complexity?: string;
  }): Promise<ProjectWithEntrepreneur[]> {
    const projects = Array.from(this.projects.values());
    
    const filteredProjects = projects.filter(project => {
      if (filters.projectType && project.projectType !== filters.projectType) return false;
      if (filters.businessArea && project.businessArea !== filters.businessArea) return false;
      if (filters.deadline && project.deadline !== filters.deadline) return false;
      if (filters.complexity && project.complexity !== filters.complexity) return false;
      return true;
    });

    // Add entrepreneur info and interest count
    const projectsWithDetails: ProjectWithEntrepreneur[] = [];
    for (const project of filteredProjects) {
      const entrepreneur = this.entrepreneurs.get(project.entrepreneurId);
      if (entrepreneur) {
        const interestCount = Array.from(this.projectInterests.values())
          .filter(interest => interest.projectId === project.id).length;
        
        projectsWithDetails.push({
          ...project,
          entrepreneur,
          interestCount
        });
      }
    }

    return projectsWithDetails.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createProject(project: InsertProject & { entrepreneurId: string }): Promise<Project> {
    const id = randomUUID();
    const newProject: Project = {
      ...project,
      id,
      status: 'available',
      createdAt: new Date()
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProjectStatus(id: string, status: string): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (project) {
      project.status = status;
      this.projects.set(id, project);
      return project;
    }
    return undefined;
  }

  // Project Interests
  async getProjectInterest(id: string): Promise<ProjectInterest | undefined> {
    return this.projectInterests.get(id);
  }

  async getProjectInterestsByProject(projectId: string): Promise<ProjectInterestWithDetails[]> {
    const interests = Array.from(this.projectInterests.values())
      .filter(interest => interest.projectId === projectId);
    
    const detailedInterests: ProjectInterestWithDetails[] = [];
    for (const interest of interests) {
      const project = this.projects.get(interest.projectId);
      const studentGroup = this.studentGroups.get(interest.studentGroupId);
      
      if (project && studentGroup) {
        detailedInterests.push({
          ...interest,
          project,
          studentGroup
        });
      }
    }

    return detailedInterests;
  }

  async getProjectInterestsByStudentGroup(studentGroupId: string): Promise<ProjectInterestWithDetails[]> {
    const interests = Array.from(this.projectInterests.values())
      .filter(interest => interest.studentGroupId === studentGroupId);
    
    const detailedInterests: ProjectInterestWithDetails[] = [];
    for (const interest of interests) {
      const project = this.projects.get(interest.projectId);
      const studentGroup = this.studentGroups.get(interest.studentGroupId);
      
      if (project && studentGroup) {
        detailedInterests.push({
          ...interest,
          project,
          studentGroup
        });
      }
    }

    return detailedInterests;
  }

  async createProjectInterest(interest: InsertProjectInterest): Promise<ProjectInterest> {
    const id = randomUUID();
    const newInterest: ProjectInterest = {
      ...interest,
      id,
      status: 'pending',
      message: interest.message || null,
      createdAt: new Date()
    };
    this.projectInterests.set(id, newInterest);
    return newInterest;
  }

  async updateProjectInterestStatus(id: string, status: string): Promise<ProjectInterest | undefined> {
    const interest = this.projectInterests.get(id);
    if (interest) {
      interest.status = status;
      this.projectInterests.set(id, interest);
      return interest;
    }
    return undefined;
  }

  // Events
  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values())
      .filter(event => event.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const newEvent: Event = {
      ...event,
      id,
      status: 'upcoming',
      createdAt: new Date()
    };
    this.events.set(id, newEvent);
    return newEvent;
  }
}

export const storage = new MemStorage();
