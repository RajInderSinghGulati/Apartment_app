import React, { useState } from "react"
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Staff = () => {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole")
  const isAdmin = userRole === "admin"

  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "Staff1",
      role: "Maid",
      contact: "+1 (555) 234-5678"
    },
    {
      id: 2,
      name: "Security Guard",
      role: "Security",
      contact: "+1 (555) 345-6789"
    },
    {
      id: 3,
      name: "Maintenance Worker",
      role: "Maintenance",
      contact: "+1 (555) 456-7890"
    }
  ])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  const fireStaff = id => {
    setStaffMembers(staff => staff.filter(member => member.id !== id))
  }

  const hireStaff = () => {
    const newStaff = {
      id: Date.now(),
      name: "New Staff Member",
      role: "General",
      contact: "+1 (555) 000-0000"
    }
    setStaffMembers(staff => [...staff, newStaff])
  }

  return (
    <Layout isAdmin={isAdmin} onLogout={handleLogout}>
      <div className="space-y-6">
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">
              Staff Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={hireStaff}
              className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-medium px-6 py-2 rounded-lg"
            >
              + Hire Staff
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Staff Members ({staffMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {staffMembers.map(staff => (
              <div
                key={staff.id}
                className="flex items-center justify-between p-4 border-l-4 border-teal-400 bg-gray-50 rounded-r-lg"
              >
                <div>
                  <h3 className="text-lg font-semibold text-teal-600">
                    {staff.name}
                  </h3>
                  <p className="text-gray-600">{staff.role}</p>
                  <p className="text-sm text-gray-500">{staff.contact}</p>
                </div>
                <Button
                  onClick={() => fireStaff(staff.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium"
                >
                  Fire
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Staff
