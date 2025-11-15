import { useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin }) {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Store.aics.pro - Login'
  }, [])

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : window.location.origin;
      
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Login failed')
      }
      
      const userData = await response.json()
      onLogin(userData)
      
      if (userData.role === 'employee') {
        navigate('/scan')
      } else {
        navigate('/inventory')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert(`Login failed: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold">A</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Store.<span className="text-blue-600">aics</span>.pro
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Scan tools • Track inventory • Manage rentals
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="text-gray-500 mt-1">Use your Google account to access the system</p>
        </div>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert('Login failed. Please try again.')}
          useOneTap
          logo_alignment="center"
          theme="outline"
          text="continue_with"
          shape="rectangular"
          width="100%"
        />

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Only authorized personnel can access this system. <br />
            Contact admin for access permissions.
          </p>
        </div>
      </div>
    </div>
  )
}