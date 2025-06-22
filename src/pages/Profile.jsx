import React from "react"
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole")
  const isAdmin = userRole === "admin"

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  const userData = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apartment 4B",
    block: "Block A",
    society: "Green Valley Apartments",
    houseMembers: ["John Doe", "Jane Doe", "Tommy Doe"],
    pets: ["Golden Retriever - Max", "Persian Cat - Fluffy"],
    vehicles: ["Honda Civic - ABC123", "Yamaha R15 - XYZ789"]
  }

  return (
    <Layout isAdmin={isAdmin} onLogout={handleLogout}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" alt={userData.name} />
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-lg">
                    {userData.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {userData.name}
                  </h3>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="ml-2 text-gray-600">{userData.phone}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="ml-2 text-gray-600">{userData.address}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Block:</span>
                  <span className="ml-2 text-gray-600">{userData.block}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Society:</span>
                  <span className="ml-2 text-gray-600">{userData.society}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* House Members */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                House Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {userData.houseMembers.map((member, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-gray-700">{member}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pets */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Pets</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {userData.pets.map((pet, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{pet}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Vehicles */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {userData.vehicles.map((vehicle, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{vehicle}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
