import React from "react"
import Navbar from "./Navbar"

const Layout = ({ children, isAdmin = false, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <Navbar isAdmin={isAdmin} onLogout={onLogout} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-gradient-to-r from-green-400 to-teal-500 text-white text-center py-4 mt-16">
        <p>© 2025 ApartmentApp. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
