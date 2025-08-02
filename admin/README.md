# smp.com Admin Panel

This is the web-based admin panel for the smp.com marketplace application.

## Features

- User management (view, ban, suspend, delete users)
- Item management (approve, reject, delete listings)
- Chat monitoring (view chat logs)
- Staff management (create, edit, delete staff accounts with custom permissions)

## Technologies Used

- React.js
- React Router
- Bootstrap
- Reactstrap

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the admin directory:
   ```
   cd admin
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

To start the development server:
```
npm start
```
or
```
yarn start
```

The application will be available at http://localhost:3000

### Building for Production

To create a production build:
```
npm run build
```
or
```
yarn build
```

## Project Structure

```
admin/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   ├── Users.js
│   │   ├── Items.js
│   │   ├── Chats.js
│   │   └── Staff.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   └── setupTests.js
├── package.json
└── README.md
```

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Removes the single build dependency

## Deployment

The app can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
