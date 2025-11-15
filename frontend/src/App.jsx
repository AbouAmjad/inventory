import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Scanner from './Scanner'
import Inventory from './Inventory'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('inventory_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    localStorage.setItem('inventory_user', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('inventory_user')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading system...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {user && (
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  A
                </div>
                <h1 className="text-xl font-bold text-gray-900">Store.aics.pro</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 hidden md:inline">
                  Welcome, {user.name}
                </span>
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
                <button 
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
        )}

        <main className="flex-1 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
            <Route 
              path="/scan" 
              element={user && user.role === 'employee' ? <Scanner user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/inventory" 
              element={user && ['owner', 'engineer'].includes(user.role) ? <Inventory user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="*" 
              element={user ? (
                user.role === 'employee' ? <Navigate to="/scan" replace /> : <Navigate to="/inventory" replace />
              ) : <Navigate to="/login" replace />} 
            />
          </Routes>
        </main>

        <footer className="bg-white shadow-inner mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AICS Inventory System. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App