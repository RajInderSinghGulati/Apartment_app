import React, { useState } from "react"
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"

const Maintenance = () => {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole")
  const isAdmin = userRole === "admin"

  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Leaky Faucet",
      description: "Kitchen faucet has been dripping for 2 days",
      status: "pending",
      timestamp: new Date(),
      location: "Apartment 4B"
    },
    {
      id: 2,
      title: "Elevator Maintenance",
      description: "Elevator making strange noises",
      status: "in-progress",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      location: "Building Common Area"
    }
  ])

  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    location: ""
  })

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  const submitRequest = () => {
    if (newRequest.title && newRequest.description) {
      const request = {
        id: Date.now(),
        title: newRequest.title,
        description: newRequest.description,
        status: "pending",
        timestamp: new Date(),
        location: newRequest.location || "Apartment 4B"
      }
      setRequests([request, ...requests])
      setNewRequest({ title: "", description: "", location: "" })
    }
  }

  const getStatusColor = status => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout isAdmin={isAdmin} onLogout={handleLogout}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Maintenance Requests
        </h1>

        {/* Submit New Request */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Submit New Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Issue Title"
              value={newRequest.title}
              onChange={e =>
                setNewRequest(prev => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Location (optional)"
              value={newRequest.location}
              onChange={e =>
                setNewRequest(prev => ({ ...prev, location: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Textarea
              placeholder="Describe the issue in detail..."
              value={newRequest.description}
              onChange={e =>
                setNewRequest(prev => ({
                  ...prev,
                  description: e.target.value
                }))
              }
              className="w-full min-h-24"
            />
            <Button
              onClick={submitRequest}
              className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white"
            >
              Submit Request
            </Button>
          </CardContent>
        </Card>

        {/* Maintenance Requests */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Current Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map(request => (
                <div
                  key={request.id}
                  className="p-4 border rounded-lg bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {request.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{request.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{request.location}</span>
                    <span>{request.timestamp.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Maintenance
