import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Items from './components/Items';
import Chats from './components/Chats';
import Staff from './components/Staff';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/items" element={<Items />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/staff" element={<Staff />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
