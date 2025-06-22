import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell } from "lucide-react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = e => {
    e.preventDefault()

    // Check if admin credentials
    if (email === "admin@apartment.com" && password === "admin123") {
      localStorage.setItem("userRole", "admin")
      navigate("/admin/blog")
    } else {
      // Regular user login
      localStorage.setItem("userRole", "user")
      navigate("/blog")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">
                ApartmentApp
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <span className="text-white underline">Home</span>
              <span className="text-white underline">Profile</span>
              <span className="text-white underline">Staff</span>
              <span className="text-white underline">Entry History</span>
              <span className="text-white underline">Visitors</span>
              <span className="text-white underline">Maintenance</span>
              <span className="text-white underline">Facilities</span>
              <span className="text-white underline">Login</span>
              <span className="text-white underline">Admin</span>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors">
                <Bell className="h-5 w-5 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-20 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p>Admin: admin@apartment.com / admin123</p>
            <p>User: user@apartment.com / user123</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-400 to-teal-500 text-white text-center py-4 fixed bottom-0 w-full">
        <p>© 2025 ApartmentApp. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Login
