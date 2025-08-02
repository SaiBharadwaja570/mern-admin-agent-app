import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import AddAgent from './pages/AddAgent'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import AgentsList from './pages/AgentsList'

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          />
          <Route
          path="/add-agent"
          element={
            <PrivateRoute>
              <AddAgent />
            </PrivateRoute>
          }
          />
          <Route path='/agents' element={<AgentsList/>} />

      </Routes>
    </Router>
  )
}

export default App

