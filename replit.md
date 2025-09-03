# Overview

ConectaTech is a web platform that connects entrepreneurs with student groups from Fatec Zona Leste for technology project development. The platform allows entrepreneurs to post project requirements while enabling student groups to browse and express interest in projects. It serves as a bridge between real business needs and academic learning opportunities, promoting practical education and fostering innovation.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **UI Framework**: Shadcn/ui components built on top of Radix UI primitives for accessibility and consistency
- **Styling**: Tailwind CSS with CSS custom properties for theming and design tokens
- **Routing**: Wouter for client-side routing with a simple, lightweight approach
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful API architecture with JSON responses
- **Development Setup**: Vite middleware integration for hot module replacement in development
- **Error Handling**: Centralized error handling middleware with structured error responses

## Data Storage
- **Database**: PostgreSQL as the primary database
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **Schema Management**: Drizzle Kit for database migrations and schema evolution
- **Validation**: Drizzle-Zod integration for runtime type validation from database schemas

## Database Schema Design
The application uses a multi-entity approach with the following core entities:
- **Users**: Base authentication table with user types (entrepreneur/student)
- **Entrepreneurs**: Profile information for business users
- **Student Groups**: Team information and capabilities
- **Projects**: Project listings with requirements and status tracking
- **Project Interests**: Many-to-many relationship tracking student group interest in projects
- **Events**: Platform events and networking opportunities

## Authentication & Session Management
- **Strategy**: Session-based authentication using PostgreSQL session storage
- **Session Store**: connect-pg-simple for PostgreSQL-backed session persistence
- **User Types**: Role-based access with entrepreneur and student user types

## Development & Build Process
- **Development**: TSX for TypeScript execution in development with hot reloading
- **Production Build**: ESBuild for server bundling, Vite for client bundling
- **Code Organization**: Monorepo structure with shared schema definitions between client and server
- **Type Safety**: Comprehensive TypeScript configuration with strict mode enabled

## UI/UX Design System
- **Design System**: Custom implementation based on Shadcn/ui with "new-york" style variant
- **Component Library**: Comprehensive set of reusable UI components (buttons, forms, cards, etc.)
- **Theming**: CSS custom properties with support for light/dark mode
- **Responsive Design**: Mobile-first approach using Tailwind CSS breakpoints
- **Accessibility**: Built on Radix UI primitives ensuring WCAG compliance

# External Dependencies

## Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting and management
- **Drizzle ORM**: Type-safe ORM for database operations
- **PostgreSQL**: Relational database for data persistence

## UI & Styling
- **Radix UI**: Unstyled, accessible UI primitives for component foundation
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for content presentation

## Development Tools
- **Vite**: Build tool and development server with HMR
- **ESBuild**: Fast bundler for production server builds  
- **TypeScript**: Static type checking and improved developer experience
- **Replit Plugins**: Development environment integration for Replit platform

## Form Handling & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Hookform Resolvers**: Integration between React Hook Form and Zod

## Server & Networking
- **TanStack Query**: Server state management and caching for the client
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Utility for creating variant-based component APIs