# smp.com - Regional Marketplace Application

This is a marketplace application similar to Facebook Marketplace, designed for users in Latvia, Estonia, and Lithuania. The application consists of three main components:

1. **Backend API** - Node.js/Express server with MongoDB database
2. **Mobile App** - React Native application for iOS and Android
3. **Web Admin Panel** - React.js application for administrative management

## Features

### Mobile App Features

- **Regional Support**: Users select their country (Latvia, Estonia, or Lithuania) during sign-up
- **Authentication**: Email/password registration and login system
- **Item Listings**: Users can create listings with photos, title, price, description, and category
- **Marketplace Browsing**: View item cards filtered by country
- **Item Details**: Full item information with seller details
- **Messaging System**: One-to-one chat per item
- **Offer System**: Buyers can make offers, sellers can accept or reject
- **Review System**: Users can leave reviews after completed transactions
- **User Profiles**: Profile management with listed items and reviews
- **Search Functionality**: Search by keyword or category

### Web Admin Panel Features

- **User Management**: View, ban, suspend, or delete users
- **Item Management**: Approve, reject, or delete item listings
- **Chat Monitoring**: Read-only access to chat logs
- **Staff Management**: Create staff accounts with custom permissions

## Technology Stack

### Backend
- Node.js with Express.js
- MongoDB database
- JWT for authentication
- Socket.IO for real-time communication
- Cloudinary for image storage

### Mobile App
- React Native
- Expo for development and deployment
- React Navigation for routing
- AsyncStorage for local storage

### Web Admin Panel
- React.js
- React Router for routing
- Bootstrap for UI components
- Reactstrap for React Bootstrap components

## Project Structure

```
smp.com/
├── backend/          # Backend API
├── mobile/           # Mobile application
├── admin/            # Web admin panel
├── PROJECT_PLAN.md   # Detailed project plan
└── README.md         # This file
```

## Getting Started

### Backend API

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your environment variables

4. Start the server:
   ```
   npm start
   ```
   or for development with auto-restart:
   ```
   npm run dev
   ```

### Mobile App

1. Navigate to the mobile directory:
   ```
   cd mobile
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Follow the instructions to run on iOS simulator, Android emulator, or physical device

### Web Admin Panel

1. Navigate to the admin directory:
   ```
   cd admin
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open http://localhost:3000 in your browser

## Development Phases Completed

1. ✅ Backend API Development
2. ✅ Mobile App Development
3. ✅ Web Admin Panel Development

## Database Schema

The application uses MongoDB with the following collections:
- Users
- Items
- Chats
- Messages
- Offers
- Reviews

## API Endpoints

The backend provides RESTful APIs for all features:
- Authentication endpoints
- User management endpoints
- Item listing endpoints
- Chat system endpoints
- Offer and transaction endpoints
- Review system endpoints
- Admin management endpoints

## Security Considerations

- HTTPS encryption for all communications
- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Role-based access control
- Rate limiting for API endpoints

## Deployment

Each component can be deployed independently:

- **Backend**: Can be deployed to any Node.js hosting service (Heroku, AWS, DigitalOcean, etc.)
- **Mobile**: Can be built and deployed to App Store and Google Play Store
- **Web Admin**: Can be deployed to any static hosting service (Netlify, Vercel, etc.)

## Testing

The project includes:
- Unit tests for backend services
- Integration tests for API endpoints
- Component tests for mobile and web interfaces

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.

## Contact

For support or queries, please contact the development team.
