# Sklep BHP - E-Commerce Platform

## Overview

Sklep BHP is a B2B/B2C e-commerce platform specializing in occupational health and safety equipment. The application provides a full-featured online store for industrial safety gear, work clothing, protective footwear, and personal protective equipment. Built with a modern TypeScript stack, it features a React-based frontend with a utility-focused design system and an Express backend with PostgreSQL database storage.

The platform supports product browsing, shopping cart functionality, order management, and user authentication with admin capabilities. The design emphasizes clarity, trust, and efficiency while maintaining industrial aesthetics through a black, yellow, and white color scheme.

## Recent Changes

### November 12, 2025 - Product Creation Fix
- **Fixed:** Admin panel product creation now works correctly when creating products with uploaded images instead of URLs
- **Backend Changes (server/routes.ts):**
  - POST /api/products: Auto-selects first uploaded file as main image if URL field is empty
  - PUT /api/products/:id: Handles empty/undefined image field by using uploaded files or preserving existing image
  - Both endpoints now provide clear error messages when no image is available
- **Frontend Changes (AdminPanel.tsx):**
  - Removed `required` attribute from image URL field
  - Updated label to clarify field is optional when files are uploaded
  - Added helpful placeholder text for better UX
- **Impact:** Users can now create/update products using either image URLs OR uploaded files (or both)

### Previous Updates
- Removed dark overlay from homepage hero section for better background image visibility
- Replaced emoji icons in category cards with real product images from database
- Implemented React Query for product data fetching with proper loading states
- Added product count display for each category

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and API interactions
- Tailwind CSS for utility-first styling

**UI Component System:**
- Shadcn/ui components (Radix UI primitives) configured in "new-york" style
- Custom design tokens defined in CSS variables for theming
- Component aliases configured for clean imports (@/components, @/lib, etc.)

**State Management Strategy:**
- Local cart state managed in App.tsx with localStorage persistence
- Server state cached and synchronized via React Query
- Form state handled by React Hook Form with Zod validation

**Key Design Decisions:**
- Single-page application with client-side routing for smooth navigation
- Component composition pattern using Radix UI primitives for accessibility
- Utility-first CSS approach with custom design system extending Tailwind
- Mobile-responsive design with breakpoint-aware components

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for type-safe API development
- ESM modules throughout the codebase
- Custom middleware for request logging and error handling

**Data Layer:**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (configured for Neon serverless)
- Schema-first approach with Zod validation integration
- In-memory storage fallback (MemStorage) for development/testing

**API Design:**
- RESTful endpoints organized by resource (/api/products, /api/orders, /api/auth)
- Request validation using Zod schemas derived from Drizzle tables
- JWT-based authentication for secure user sessions
- Bcrypt for password hashing

**Key Architectural Patterns:**
- Repository pattern abstracted through IStorage interface
- Dependency injection ready (storage can be swapped between memory/database)
- Middleware pipeline for cross-cutting concerns (logging, error handling)
- Environment-based configuration for development vs. production

### Authentication & Authorization

**Implementation:**
- JWT tokens for stateless authentication
- Bcrypt password hashing (bcryptjs) with salt rounds
- User roles (isAdmin flag) for admin functionality
- Token-based session management stored in localStorage on client
- Protected routes and API endpoints based on authentication status

### Build & Deployment Strategy

**Development:**
- Vite HMR for fast frontend iteration
- tsx for running TypeScript server code directly
- Concurrent development server setup with Vite middleware

**Production:**
- Frontend: Vite build outputs to dist/public
- Backend: esbuild bundles server code to dist/index.js
- Single Node.js process serves both static files and API
- Environment variable configuration for database URLs and secrets

## External Dependencies

### Database & ORM
- **PostgreSQL**: Primary database (configured for @neondatabase/serverless)
- **Drizzle ORM**: Type-safe database toolkit with schema definitions in shared/schema.ts
- **drizzle-kit**: CLI tool for database migrations and schema management

### UI & Component Libraries
- **Radix UI**: Headless component primitives (@radix-ui/* packages)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **cmdk**: Command palette component

### Authentication & Security
- **jsonwebtoken**: JWT creation and verification
- **bcryptjs**: Password hashing library

### Form & Validation
- **React Hook Form**: Form state management (@hookform/resolvers)
- **Zod**: Schema validation and TypeScript inference
- **drizzle-zod**: Integration between Drizzle schemas and Zod

### Build Tools & Development
- **Vite**: Frontend build tool and dev server
- **esbuild**: Backend bundler for production
- **tsx**: TypeScript execution for development
- **TypeScript**: Type system throughout the stack

### Routing & State
- **wouter**: Lightweight routing library
- **TanStack Query**: Server state management and caching

### Development Enhancements (Replit-specific)
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay
- **@replit/vite-plugin-cartographer**: Code navigation
- **@replit/vite-plugin-dev-banner**: Development banner

### Design System
- **class-variance-authority (CVA)**: Type-safe variant API for components
- **clsx & tailwind-merge**: Utility for conditional className composition
- **Inter font**: Primary typeface from Google Fonts