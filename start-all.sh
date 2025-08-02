#!/bin/bash

# Script to start all services for smp.com development

echo "Starting smp.com development environment..."

# Start backend API
echo "Starting backend API..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!
cd ..

# Start mobile app
echo "Starting mobile app..."
cd mobile
npm install
npm start &
MOBILE_PID=$!
cd ..

# Start admin panel
echo "Starting admin panel..."
cd admin
npm install
npm start &
ADMIN_PID=$!
cd ..

echo "All services started!"
echo "Backend API running on http://localhost:5000"
echo "Mobile app running on http://localhost:19000 (Expo DevTools)"
echo "Admin panel running on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for all background processes
wait $BACKEND_PID $MOBILE_PID $ADMIN_PID
