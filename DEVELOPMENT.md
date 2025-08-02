# smp.com Development Setup

This document provides instructions for setting up the development environment for the smp.com marketplace application.

## Prerequisites

Before you begin, ensure you have the following installed:

1. Node.js (version 14 or higher)
2. npm or yarn
3. MongoDB (local installation or cloud instance)
4. Expo CLI (for mobile development)
   ```
   npm install -g expo-cli
   ```
5. Git

## Project Structure

The project consists of three main components:

```
smp.com/
├── backend/     # Node.js/Express backend API
├── mobile/      # React Native mobile application
├── admin/       # React.js web admin panel
└── ...          # Documentation and scripts
```

## Environment Variables

Each component requires environment variables to be configured:

### Backend API
Create a `.env` file in the `backend/` directory:
```
MONGODB_URI=mongodb://localhost:27017/smp
PORT=5000
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Mobile App
No specific environment variables required for basic setup.

### Web Admin Panel
No specific environment variables required for basic setup.

## Installation

### Backend API

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
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

## Starting All Services

To start all services simultaneously, use the provided script:
```
./start-all.sh
```

This script will start:
- Backend API on port 5000
- Mobile app Expo development server on port 19000
- Web admin panel on port 3000

## Database Setup

The application uses MongoDB as its database. You can use either:

1. Local MongoDB installation
2. MongoDB Atlas (cloud database)
3. Docker container with MongoDB

For local development, ensure MongoDB is running:
```
mongod
```

## Development Workflow

### Backend Development
1. Make changes to the backend code
2. The server will automatically restart with nodemon
3. Test API endpoints using tools like Postman

### Mobile App Development
1. Make changes to React Native components
2. The Expo development server will reload automatically
3. Test on simulator/emulator or physical device

### Web Admin Panel Development
1. Make changes to React components
2. The development server will reload automatically
3. View changes in the browser

## Testing

Each component has its own testing setup:

### Backend API Testing
```
cd backend
npm test
```

### Mobile App Testing
```
cd mobile
npm test
```

### Web Admin Panel Testing
```
cd admin
npm test
```

## Deployment

### Backend API
The backend can be deployed to any Node.js hosting service:
- Heroku
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Google Cloud Run
- Azure App Service

### Mobile App
The mobile app can be built and deployed to:
- Apple App Store
- Google Play Store

### Web Admin Panel
The web admin panel can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Troubleshooting

### Common Issues

1. **Port conflicts**
   - Ensure ports 5000, 3000, and 19000 are available
   - Change ports in respective configuration files if needed

2. **MongoDB connection errors**
   - Ensure MongoDB is running
   - Check MongoDB connection string in `.env` file

3. **Dependency installation errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json` and reinstall

4. **Mobile app not loading**
   - Ensure Expo CLI is installed globally
   - Check firewall settings for development server

### Getting Help

If you encounter issues not covered in this document:
1. Check the console logs for error messages
2. Review the respective component's README files
3. Search for similar issues in the project's issue tracker
4. Contact the development team for assistance
