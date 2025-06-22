import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Bell } from "lucide-react"

const Navbar = ({ isAdmin = false, onLogout }) => {
  const location = useLocation()

  const isActive = path => location.pathname === path

  const userLinks = [
    { path: "/blog", label: "Home" },
    { path: "/profile", label: "Profile" },
    { path: "/staff", label: "Staff" },
    { path: "/entry-history", label: "Entry History" },
    { path: "/visitors", label: "Visitors" },
    { path: "/maintenance", label: "Maintenance" },
    { path: "/facilities", label: "Facilities" }
  ]

  const adminLinks = [
    { path: "/admin/blog", label: "Home" },
    { path: "/admin/profiles", label: "Profile" },
    { path: "/admin/houses", label: "Houses" },
    { path: "/admin/staff", label: "Staff" },
    { path: "/admin/vehicles", label: "Vehicles" },
    { path: "/admin/pets", label: "Pets" },
    { path: "/admin/maintenance", label: "Maintenance" },
    { path: "/admin/facilities", label: "Facilities" },
    { path: "/login", label: "Login" },
    { path: "/admin", label: "Admin" }
  ]

  const links = isAdmin ? adminLinks : userLinks

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to={isAdmin ? "/admin/blog" : "/blog"}
              className="text-2xl font-bold text-white"
            >
              ApartmentApp
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium underline hover:text-teal-200 transition-colors ${
                    isActive(link.path) ? "text-yellow-200" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAdmin && (
              <button className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors">
                <Bell className="h-5 w-5 text-gray-800" />
              </button>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-white hover:text-teal-200 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
