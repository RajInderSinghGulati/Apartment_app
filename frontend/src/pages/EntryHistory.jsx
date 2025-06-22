import React, { useState } from "react"
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const EntryHistory = () => {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole")
  const isAdmin = userRole === "admin"

  const [entries, setEntries] = useState([
    {
      id: 1,
      name: "John Smith",
      type: "visitor",
      purpose: "Family visit",
      timestamp: new Date(),
      status: "entered"
    },
    {
      id: 2,
      name: "Staff1",
      type: "staff",
      purpose: "Cleaning service",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "exited"
    }
  ])

  const [newVisitor, setNewVisitor] = useState({
    name: "",
    purpose: ""
  })

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  const addVisitor = () => {
    if (newVisitor.name && newVisitor.purpose) {
      const newEntry = {
        id: Date.now(),
        name: newVisitor.name,
        type: "visitor",
        purpose: newVisitor.purpose,
        timestamp: new Date(),
        status: "entered"
      }
      setEntries([newEntry, ...entries])
      setNewVisitor({ name: "", purpose: "" })
    }
  }

  return (
    <Layout isAdmin={isAdmin} onLogout={handleLogout}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Entry History & Visitors
        </h1>

        {/* Add New Visitor */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Add Future Visitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Visitor Name"
                value={newVisitor.name}
                onChange={e =>
                  setNewVisitor(prev => ({ ...prev, name: e.target.value }))
                }
                className="flex-1"
              />
              <Input
                placeholder="Purpose of Visit"
                value={newVisitor.purpose}
                onChange={e =>
                  setNewVisitor(prev => ({ ...prev, purpose: e.target.value }))
                }
                className="flex-1"
              />
              <Button
                onClick={addVisitor}
                className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Entry History */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Entry History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.map(entry => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {entry.name}
                        </h3>
                        <p className="text-sm text-gray-600">{entry.purpose}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          entry.type === "visitor"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {entry.type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          entry.status === "entered"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {entry.timestamp.toLocaleString()}
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

export default EntryHistory
