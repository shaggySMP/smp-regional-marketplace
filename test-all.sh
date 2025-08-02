#!/bin/bash

# Script to test all services for smp.com

echo "Testing smp.com services..."

# Test backend API health endpoint
echo "Testing backend API..."
cd backend
npm install
if curl -s http://localhost:5000/api/health | grep -q "OK"; then
  echo "✅ Backend API is running"
else
  echo "❌ Backend API is not responding"
fi
cd ..

# Test mobile app (check if package.json exists)
echo "Checking mobile app..."
cd mobile
if [ -f "package.json" ]; then
  echo "✅ Mobile app package.json found"
else
  echo "❌ Mobile app package.json not found"
fi
cd ..

# Test admin panel (check if package.json exists)
echo "Checking admin panel..."
cd admin
if [ -f "package.json" ]; then
  echo "✅ Admin panel package.json found"
else
  echo "❌ Admin panel package.json not found"
fi
cd ..

echo "Testing completed!"
