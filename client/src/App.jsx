import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddAgent from './pages/AddAgent'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import AgentsList from './pages/AgentsList'
import UploadList from './pages/UploadList'
import RegisterPage from './pages/Registerage'

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<Login/>} />
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
          <Route path='/upload-list' element={<UploadList/>} />
          <Route path='/register' element={<RegisterPage/>} />

      </Routes>
    </Router>
  )
}

export default App

