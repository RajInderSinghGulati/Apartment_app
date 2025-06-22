import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Blog from "./pages/Blog"
import Profile from "./pages/Profile"
import Staff from "./pages/Staff"
import EntryHistory from "./pages/EntryHistory"
import Maintenance from "./pages/Maintenance"
import Facilities from "./pages/Facilities"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/entry-history" element={<EntryHistory />} />
          <Route path="/visitors" element={<EntryHistory />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/facilities" element={<Facilities />} />

          {/* Admin Routes */}
          <Route path="/admin/blog" element={<Blog />} />
          <Route path="/admin/profiles" element={<Profile />} />
          <Route path="/admin/houses" element={<Profile />} />
          <Route path="/admin/staff" element={<Staff />} />
          <Route path="/admin/vehicles" element={<Profile />} />
          <Route path="/admin/pets" element={<Profile />} />
          <Route path="/admin/maintenance" element={<Maintenance />} />
          <Route path="/admin/facilities" element={<Facilities />} />
          <Route
            path="/admin"
            element={<Navigate to="/admin/blog" replace />}
          />

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
