# smp.com - Marketplace Application Project Plan

## Overview
This document outlines the comprehensive plan for developing smp.com, a marketplace application similar to Facebook Marketplace for users in Latvia, Estonia, and Lithuania. The application will consist of a mobile app for users and a web-based admin panel for management.

## Technology Stack
- **Mobile App**: React Native (cross-platform iOS/Android)
- **Web Admin Panel**: React.js
- **Backend API**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: Socket.IO (for chat functionality)
- **Image Storage**: Cloudinary (or similar service)
- **Deployment**: Docker containers with Kubernetes orchestration

## Mobile App Features

### 1. Regional Support
- Country selection during sign-up (Latvia, Estonia, Lithuania)
- Country selector screen for non-logged-in users
- Marketplace filtering based on selected country

### 2. Authentication System
- Email/password registration with country selection
- Login/logout functionality
- Password reset functionality
- User session management

### 3. Item Listings (Seller)
- Create listing with:
  - Photo upload (multiple images)
  - Title
  - Price
  - Description
  - Category selection
- Edit/Delete existing listings
- Mark items as sold

### 4. Browse Listings (Buyer)
- Marketplace screen with item cards
- Filtering by category
- Search functionality (keyword search)
- Country-based filtering

### 5. Item Detail Screen
- Full item information display
- Seller information
- "Send Message" button
- "Make Offer" button
- Transaction warning message

### 6. Chat System (Per Item)
- Separate chat for each item
- Chat list view
- Conversation view
- "Make Offer" button in chat

### 7. Offer & Sale Flow
- Buyers can make offers in chat
- Sellers can accept/reject offers
- Mark item as "Sold"
- Mark item as "Received"
- Automatic review eligibility after sale completion

### 8. Review System
- Reviews only after:
  - Offer accepted
  - Item marked as "Sold"
- Review submission form
- Reviews displayed on user profiles

### 9. User Profile Screen
- Profile photo upload
- List of user's items
- User reviews display
- Edit profile information

### 10. Search Function
- Keyword search
- Category filtering
- Country-based results

## Web-based Admin Panel Features

### 1. User Management
- View all registered users
- Ban/suspend users
- View user activity logs

### 2. Listing Management
- View all listings
- Approve/reject new listings
- Delete inappropriate listings
- View listing reports

### 3. Chat Monitoring
- Read-only access to chat logs
- Search chat content
- Flag inappropriate conversations

### 4. Staff Management
- Create staff accounts
- Assign custom permissions:
  - Approve listings only
  - Suspend listings
  - View activity (no delete/ban permissions)

## Development Phases

### Phase 1: Backend API Development
1. Set up Node.js/Express server
2. Implement database models (User, Item, Chat, Offer, Review)
3. Create authentication endpoints (register, login, logout)
4. Implement item listing endpoints (create, read, update, delete)
5. Develop chat system endpoints
6. Implement offer and sale flow endpoints
7. Create review system endpoints
8. Develop admin panel endpoints
9. Implement search functionality
10. Add country-based filtering logic

### Phase 2: Mobile App Development
1. Set up React Native project
2. Implement authentication screens (sign-up, login, country selection)
3. Develop marketplace browsing screen
4. Create item detail screen
5. Implement item creation flow
6. Develop chat system interface
7. Create offer functionality
8. Implement user profile screen
9. Add search functionality
10. Implement country filtering throughout the app

### Phase 3: Web Admin Panel Development
1. Set up React.js project
2. Implement admin authentication
3. Create user management dashboard
4. Develop listing management interface
5. Implement chat monitoring system
6. Create staff management features
7. Add reporting and analytics views

### Phase 4: Integration and Testing
1. Connect mobile app to backend API
2. Connect web admin panel to backend API
3. Implement real-time features (chat notifications)
4. Conduct thorough testing (unit, integration, end-to-end)
5. Fix bugs and optimize performance
6. Security audit and penetration testing

### Phase 5: Deployment and Documentation
1. Set up production environment
2. Deploy mobile app to app stores
3. Deploy web admin panel
4. Create user documentation
5. Create admin documentation
6. Set up monitoring and logging

## Database Schema Design

### Users Collection
- _id (ObjectId)
- email (String)
- password (String - hashed)
- country (String - enum: Latvia, Estonia, Lithuania)
- profilePhoto (String - URL)
- createdAt (Date)
- updatedAt (Date)
- isBanned (Boolean)
- isSuspended (Boolean)

### Items Collection
- _id (ObjectId)
- title (String)
- price (Number)
- description (String)
- category (String)
- images (Array of Strings - URLs)
- sellerId (ObjectId - reference to Users)
- country (String - derived from seller's country)
- isSold (Boolean)
- isReceived (Boolean)
- createdAt (Date)
- updatedAt (Date)

### Chats Collection
- _id (ObjectId)
- itemId (ObjectId - reference to Items)
- participants (Array of ObjectIds - references to Users)
- createdAt (Date)
- updatedAt (Date)

### Messages Collection
- _id (ObjectId)
- chatId (ObjectId - reference to Chats)
- senderId (ObjectId - reference to Users)
- text (String)
- timestamp (Date)
- isOffer (Boolean)
- offerAmount (Number - if isOffer is true)

### Offers Collection
- _id (ObjectId)
- itemId (ObjectId - reference to Items)
- buyerId (ObjectId - reference to Users)
- sellerId (ObjectId - reference to Users)
- amount (Number)
- status (String - enum: pending, accepted, rejected)
- chatId (ObjectId - reference to Chats)
- createdAt (Date)
- updatedAt (Date)

### Reviews Collection
- _id (ObjectId)
- reviewerId (ObjectId - reference to Users)
- reviewedUserId (ObjectId - reference to Users)
- itemId (ObjectId - reference to Items)
- rating (Number - 1 to 5)
- comment (String)
- createdAt (Date)

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/reset-password

### Users
- GET /api/users/profile/:id
- PUT /api/users/profile
- PUT /api/users/profile/photo

### Items
- GET /api/items?country=:country&category=:category&search=:search
- GET /api/items/:id
- POST /api/items
- PUT /api/items/:id
- DELETE /api/items/:id
- PUT /api/items/:id/sold
- PUT /api/items/:id/received

### Chats
- GET /api/chats
- GET /api/chats/:id/messages
- POST /api/chats/:id/messages

### Offers
- POST /api/offers
- PUT /api/offers/:id/status

### Reviews
- POST /api/reviews
- GET /api/reviews/user/:userId

### Admin
- GET /api/admin/users
- PUT /api/admin/users/:id/ban
- PUT /api/admin/users/:id/suspend
- GET /api/admin/items
- PUT /api/admin/items/:id/approve
- PUT /api/admin/items/:id/reject
- DELETE /api/admin/items/:id
- GET /api/admin/chats
- GET /api/admin/staff
- POST /api/admin/staff

## Security Considerations
- HTTPS encryption for all communications
- JWT token expiration and refresh tokens
- Password hashing with bcrypt
- Input validation and sanitization
- Role-based access control
- Rate limiting for API endpoints
- Content Security Policy headers
- Secure image upload handling

## Performance Considerations
- Database indexing for frequently queried fields
- Pagination for large data sets
- Image optimization and caching
- API response caching where appropriate
- Database connection pooling
- Load balancing for high availability

## Testing Strategy
- Unit tests for all backend services
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- UI component tests for mobile and web interfaces
- Performance testing under load
- Security testing and vulnerability scanning

## Deployment Architecture
- Load balancer for distributing traffic
- Application servers for backend API
- Database servers (MongoDB cluster)
- CDN for static assets (images)
- Redis for caching and session storage
- Monitoring and logging services
- Automated deployment pipelines

## Timeline Estimate
- Phase 1 (Backend API): 4-6 weeks
- Phase 2 (Mobile App): 6-8 weeks
- Phase 3 (Web Admin Panel): 4-6 weeks
- Phase 4 (Integration & Testing): 3-4 weeks
- Phase 5 (Deployment & Documentation): 1-2 weeks

Total estimated time: 18-26 weeks (4.5-6.5 months)

## Team Structure
- Backend Developer (Node.js/MongoDB)
- Mobile Developer (React Native)
- Frontend Developer (React.js for admin panel)
- DevOps Engineer (Deployment/Infrastructure)
- QA Engineer (Testing)
- UI/UX Designer
- Project Manager

## Budget Considerations
- Developer salaries
- Cloud hosting costs (AWS/Azure/Google Cloud)
- Third-party services (Cloudinary, etc.)
- App store developer accounts
- Domain registration and SSL certificates
- Monitoring and analytics tools
- Legal and compliance costs
