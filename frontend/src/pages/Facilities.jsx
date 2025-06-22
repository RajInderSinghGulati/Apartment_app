import React, { useState } from "react"
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Calendar } from "lucide-react"

const Facilities = () => {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole")
  const isAdmin = userRole === "admin"
  const currentUser = "John Doe" // This would come from auth context
  const currentHouse = "A-101" // This would come from user profile

  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: "Swimming Pool",
      status: "Open",
      hours: "6:00 AM - 10:00 PM",
      description: "Olympic-sized swimming pool with separate kids area",
      bookings: [
        {
          id: 1,
          date: "2025-01-20",
          time: "10:00",
          duration: 2,
          bookedBy: "Sarah Johnson",
          houseNumber: "B-205",
          purpose: "Family swim time"
        }
      ]
    },
    {
      id: 2,
      name: "Gymnasium",
      status: "Open",
      hours: "5:00 AM - 11:00 PM",
      description: "Fully equipped gym with modern equipment",
      bookings: []
    },
    {
      id: 3,
      name: "Community Hall",
      status: "Available for Booking",
      hours: "9:00 AM - 11:00 PM",
      description: "Perfect for events and gatherings",
      bookings: [
        {
          id: 2,
          date: "2025-01-25",
          time: "18:00",
          duration: 4,
          bookedBy: "Mike Chen",
          houseNumber: "A-303",
          purpose: "Birthday party"
        }
      ]
    },
    {
      id: 4,
      name: "Children's Playground",
      status: "Open",
      hours: "6:00 AM - 8:00 PM",
      description: "Safe and fun playground for kids",
      bookings: []
    },
    {
      id: 5,
      name: "Parking",
      status: "Available",
      hours: "24/7",
      description: "Covered parking with security",
      bookings: []
    }
  ])

  const [selectedFacility, setSelectedFacility] = useState(null)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [newBooking, setNewBooking] = useState({
    date: "",
    time: "",
    duration: 1,
    purpose: ""
  })

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  const openBookingDialog = facility => {
    setSelectedFacility(facility)
    setShowBookingDialog(true)
  }

  const createBooking = () => {
    if (
      !selectedFacility ||
      !newBooking.date ||
      !newBooking.time ||
      !newBooking.purpose.trim()
    )
      return

    const booking = {
      id: Date.now(),
      date: newBooking.date,
      time: newBooking.time,
      duration: newBooking.duration,
      bookedBy: currentUser,
      houseNumber: currentHouse,
      purpose: newBooking.purpose
    }

    setFacilities(prev =>
      prev.map(facility => {
        if (facility.id === selectedFacility.id) {
          return {
            ...facility,
            bookings: [...facility.bookings, booking].sort(
              (a, b) =>
                new Date(a.date + " " + a.time).getTime() -
                new Date(b.date + " " + b.time).getTime()
            )
          }
        }
        return facility
      })
    )

    setNewBooking({ date: "", time: "", duration: 1, purpose: "" })
    setShowBookingDialog(false)
    setSelectedFacility(null)
  }

  const cancelBooking = (facilityId, bookingId) => {
    setFacilities(prev =>
      prev.map(facility => {
        if (facility.id === facilityId) {
          return {
            ...facility,
            bookings: facility.bookings.filter(
              booking => booking.id !== bookingId
            )
          }
        }
        return facility
      })
    )
  }

  const isTimeSlotAvailable = (facility, date, time, duration) => {
    const newStart = new Date(`${date} ${time}`)
    const newEnd = new Date(newStart.getTime() + duration * 60 * 60 * 1000)

    return !facility.bookings.some(booking => {
      const existingStart = new Date(`${booking.date} ${booking.time}`)
      const existingEnd = new Date(
        existingStart.getTime() + booking.duration * 60 * 60 * 1000
      )

      return newStart < existingEnd && newEnd > existingStart
    })
  }

  const getStatusColor = status => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800"
      case "Available for Booking":
        return "bg-blue-100 text-blue-800"
      case "Available":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout isAdmin={isAdmin} onLogout={handleLogout}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Facilities</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map(facility => (
            <Card
              key={facility.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  {facility.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Status:
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                      facility.status
                    )}`}
                  >
                    {facility.status}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Hours:
                  </span>
                  <p className="text-sm text-gray-700 mt-1">{facility.hours}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Description:
                  </span>
                  <p className="text-sm text-gray-700 mt-1">
                    {facility.description}
                  </p>
                </div>

                {facility.bookings.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Upcoming Bookings:
                    </span>
                    <div className="mt-2 space-y-2">
                      {facility.bookings.slice(0, 2).map(booking => (
                        <div
                          key={booking.id}
                          className="bg-gray-50 p-2 rounded text-xs"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">
                                {booking.bookedBy} (House {booking.houseNumber})
                              </p>
                              <p className="text-gray-600">{booking.purpose}</p>
                            </div>
                            <div className="text-right">
                              <p>
                                {new Date(booking.date).toLocaleDateString()}
                              </p>
                              <p>
                                {booking.time} ({booking.duration}h)
                              </p>
                            </div>
                          </div>
                          {(isAdmin || booking.bookedBy === currentUser) && (
                            <Button
                              onClick={() =>
                                cancelBooking(facility.id, booking.id)
                              }
                              variant="destructive"
                              size="sm"
                              className="mt-2 h-6 text-xs"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      ))}
                      {facility.bookings.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{facility.bookings.length - 2} more bookings
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {facility.status === "Available for Booking" && (
                  <Button
                    onClick={() => openBookingDialog(facility)}
                    className="w-full bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book {selectedFacility?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newBooking.date}
                  onChange={e =>
                    setNewBooking(prev => ({ ...prev, date: e.target.value }))
                  }
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newBooking.time}
                  onChange={e =>
                    setNewBooking(prev => ({ ...prev, time: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="12"
                  value={newBooking.duration}
                  onChange={e =>
                    setNewBooking(prev => ({
                      ...prev,
                      duration: parseInt(e.target.value)
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  value={newBooking.purpose}
                  onChange={e =>
                    setNewBooking(prev => ({
                      ...prev,
                      purpose: e.target.value
                    }))
                  }
                  placeholder="e.g., Birthday party, Meeting, etc."
                />
              </div>

              {selectedFacility && newBooking.date && newBooking.time && (
                <div className="text-sm">
                  {isTimeSlotAvailable(
                    selectedFacility,
                    newBooking.date,
                    newBooking.time,
                    newBooking.duration
                  ) ? (
                    <p className="text-green-600">✓ Time slot is available</p>
                  ) : (
                    <p className="text-red-600">
                      ✗ Time slot conflicts with existing booking
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={createBooking}
                  disabled={
                    !selectedFacility ||
                    !newBooking.date ||
                    !newBooking.time ||
                    !newBooking.purpose.trim() ||
                    !isTimeSlotAvailable(
                      selectedFacility,
                      newBooking.date,
                      newBooking.time,
                      newBooking.duration
                    )
                  }
                  className="flex-1 bg-gradient-to-r from-green-400 to-teal-500"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowBookingDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

export default Facilities
