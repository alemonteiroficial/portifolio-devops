# Secode Website - Replit Documentation

## Overview

This is a full-stack web application for Secode, a company specializing in AI-powered digital solutions for small businesses. The application is built as a modern SPA (Single Page Application) with a React frontend and Express backend, featuring AI-powered chatbot functionality, contact management, and multi-page navigation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, React hooks for component state
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite with custom configuration for client-server separation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with JSON responses
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL store

### Database Design
- **Primary Database**: PostgreSQL (Neon serverless)
- **Tables**: 
  - `users` (authentication)
  - `contacts` (contact form submissions)
  - `chat_messages` (AI chat history)
  - `whatsapp_leads` (WhatsApp integration leads)

## Key Components

### 1. AI-Powered Chat System
- **Purpose**: Provides 24/7 customer support using AWS Bedrock
- **Implementation**: Custom chat hook with session persistence
- **Features**: Contextual responses, lead qualification, appointment scheduling
- **Integration**: WhatsApp modal for lead capture

### 2. Multi-Page Website Structure
- **Home Page**: AI-focused hero section with company overview
- **Products Page**: Detailed product catalog with "Digitalize Fácil" focus
- **About Page**: Company information and values
- **Plans Page**: Pricing tiers with WhatsApp integration
- **Admin Dashboard**: Contact and lead management

### 3. Contact Management System
- **Contact Forms**: Multiple forms across different pages
- **Lead Tracking**: Status management (new, contacted, converted)
- **Admin Interface**: Dashboard for managing customer inquiries
- **WhatsApp Integration**: Direct lead capture to WhatsApp Business

### 4. Responsive Design System
- **Mobile-First**: Optimized for mobile devices
- **Component Library**: shadcn/ui components with custom styling
- **Dark Theme**: Purple and black color scheme matching brand
- **Animations**: Smooth transitions and hover effects

## Data Flow

### User Interaction Flow
1. **Landing**: User arrives at homepage via SEO-optimized content
2. **Engagement**: AI chat popup or navigation to specific pages
3. **Lead Capture**: Contact forms or WhatsApp modal integration
4. **Follow-up**: Admin dashboard for sales team management

### AI Chat Flow
1. **Initialization**: Chat state loaded from session storage
2. **User Input**: Message sent to backend API endpoint
3. **AI Processing**: AWS Bedrock processes request with business context
4. **Response**: Formatted response with markdown support
5. **Persistence**: Chat history saved to database and session

### Contact Management Flow
1. **Form Submission**: Validated data sent to `/api/contacts`
2. **Database Storage**: Contact stored with status "new"
3. **Admin Notification**: Available in admin dashboard
4. **Status Updates**: Admin can update contact status via API

## External Dependencies

### AI Services
- **AWS Bedrock**: Primary AI service for chatbot responses
- **Integration**: Custom business context and response formatting
- **Fallback**: Smart response system based on keyword matching

### Database Services
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Connection**: Pool-based connections with automatic scaling
- **Migrations**: Drizzle Kit for schema management

### Third-Party Integrations
- **WhatsApp Business**: Direct integration for lead conversion
- **Google Analytics**: User behavior tracking (G-Q34CBHFDV8)
- **Font Awesome**: Icon library for UI elements

### Development Tools
- **Replit Integration**: Custom vite plugin for Replit environment
- **Error Handling**: Runtime error modal for development
- **Hot Reload**: Vite HMR with Express middleware

## Deployment Strategy

### Platform Flexibility
The application supports multiple deployment platforms:

1. **Netlify (Recommended)**
   - Automatic builds from Git
   - Serverless functions in `netlify/functions/`
   - Environment variable configuration
   - CDN distribution

2. **AWS Amplify**
   - Lambda functions for backend API
   - API Gateway integration
   - Manual configuration of AI services

3. **Replit Native**
   - Direct deployment with built-in database
   - Environment variable management
   - Custom domain support

### Build Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public` (frontend), `dist/` (backend)
- **Environment Variables**: 
  - `DATABASE_URL` (required)
  - `OPENAI_API_KEY` (optional fallback)
  - `AWS_*` credentials (for Bedrock)

### Performance Optimizations
- **Code Splitting**: Vite automatic code splitting
- **Asset Optimization**: Image optimization and lazy loading
- **Caching**: Browser caching with appropriate headers
- **Bundle Analysis**: Built-in analyzer for optimization

## Changelog
- July 02, 2025: Initial setup
- July 02, 2025: Asaas payment integration completed and tested successfully
  - Credit card, PIX, and boleto payment methods integrated
  - Sandbox testing confirmed working
  - Client creation and charge processing automated
  - Official Asaas checkout redirection functional
- July 04, 2025: UX improvements and payment flow optimization
  - Removed duplicate credit card forms for better user experience
  - Simplified checkout to single-form process
  - Fixed payment processing issues with proper address data
  - Configured sandbox environment for reliable testing
  - Payment processing now working end-to-end successfully
- July 04, 2025: PIX QR Code implementation completed and tested
  - Real QR code generation using qrcode library
  - Visual QR code display directly on checkout page
  - Copyable PIX code with user instructions
  - Intelligent fallback for sandbox environment
  - User successfully tested QR code scanning with bank app
  - QR code correctly identified as demo/invalid (expected sandbox behavior)
- July 04, 2025: Production preparation and boleto removal
  - Removed boleto payment method (not required)
  - Simplified checkout to credit card and PIX only
  - Created PRODUCTION_SETUP.md with complete deployment guide
  - System ready for production deployment after Asaas approval
- July 05, 2025: Recurring payment system implemented
  - Converted credit card payments to monthly subscriptions
  - Fixed production environment detection for proper API mode
  - Implemented `/v3/subscriptions` endpoint for recurring charges
  - Successfully tested monthly subscription creation (sub_71smpxs4ie6sbm62)
  - System now creates active monthly subscriptions instead of one-time payments
- July 06, 2025: Sales funnel optimization and checkout improvements
  - Completely removed PIX payment option from checkout system
  - Simplified checkout to credit card only for recurring subscriptions
  - Created comprehensive sales page `/plano-detalhes` with persuasive copy
  - Added "Saiba Mais" buttons to redirect from plans to detailed sales page
  - Implemented problem-solution framework with testimonials and urgency
  - Sales page includes detailed benefits, features, and conversion elements
  - Fixed TypeScript errors in checkout form handling
- July 07, 2025: Product strategy restructure - "Digitalize Fácil" as single product
  - Restructured "Digitalize Fácil" as single unified product with 3 plan tiers
  - Updated plan structure: Start (Essencial), Plus (Avançado), Master (Completo)
  - Implemented detailed feature matrix based on comprehensive functionality list
  - Removed "Custom" plan option and simplified grid layout to 3 columns
  - Updated all pages (plans, details, checkout) with new feature specifications
  - Maintained "Saiba Mais" redirection flow to sales pages before checkout
  - Plans now clearly show progression from basic WhatsApp IA to complete digital strategy
  - Created comprehensive comparison table with ✅/❌ checklist format
  - Implemented /digitalize-comparacao route with detailed feature matrix
  - Fixed dark theme styling issues with proper table row coloring
  - Removed CRM AI and Gestão Inteligente products, keeping only Digitalize Fácil as single product focus
  - Updated pricing structure: Start R$ 74,50, Plus R$ 139,70, Master R$ 247,80
  - Applied new pricing across all pages (comparison, details, checkout)
- July 09, 2025: Database integration and admin dashboard
  - Implemented comprehensive admin dashboard at /admin with contact and lead management
  - Created database schema with contacts, whatsapp_leads, chat_messages, and users tables
  - Added test data for demonstration purposes
  - Configured Neon PostgreSQL database with proper SSL support
  - Built API endpoints for data retrieval and management
  - System ready for production with real data collection
  - Configured Supabase integration with REST API client
  - Created complete SQL schema for Supabase migration (supabase-schema.sql)
  - Successfully migrated from Neon to Supabase as primary database
  - System now running on Supabase with enhanced scalability and visual management
  - Updated content positioning: Secode as AI consultancy focused on data-driven decisions
  - Refined messaging to emphasize growth, intelligence, and strategic consulting services

## User Preferences

Preferred communication style: Simple, everyday language.