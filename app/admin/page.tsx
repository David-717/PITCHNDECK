"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, UserCheck, Shield, Calendar, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  role: string
  company?: string
  phone?: string
  isActive: boolean
  createdAt: string
  lastLogin?: string
  portfolioValue: number
  totalReturns: number
  signupIP?: string
  lastLoginIP?: string
}

interface AdminData {
  users: User[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  statistics: {
    totalUsers: number
    activeUsers: number
    adminUsers: number
    clientUsers: number
  }
  recentSignups: number
}

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [loadingData, setLoadingData] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/auth")
    }
  }, [user, loading, router])

  const fetchAdminData = async (page = 1) => {
    try {
      setLoadingData(true)
      const response = await fetch(`/api/admin/users?page=${page}&limit=20`, {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setAdminData(data)
      } else {
        console.error("Failed to fetch admin data")
      }
    } catch (error) {
      console.error("Error fetching admin data:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          isActive: !currentStatus,
        }),
        credentials: "include",
      })

      if (response.ok) {
        // Refresh data
        fetchAdminData(currentPage)
      }
    } catch (error) {
      console.error("Error updating user status:", error)
    }
  }

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchAdminData()
    }
  }, [user])

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              PITCHNDECK
            </motion.div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <Shield className="w-4 h-4" />
              <span>Admin Panel</span>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="border-gray-600 hover:bg-gray-800 bg-transparent">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              ADMIN
              <br />
              PANEL
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Manage users, monitor sign-ups, and oversee platform activity
            </p>
          </motion.div>

          {/* Statistics */}
          {adminData && (
            <motion.div
              className="grid md:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{adminData.statistics.totalUsers}</div>
                  <div className="text-gray-400">Total Users</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 hover:border-green-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <UserCheck className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{adminData.statistics.activeUsers}</div>
                  <div className="text-gray-400">Active Users</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{adminData.statistics.adminUsers}</div>
                  <div className="text-gray-400">Admins</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{adminData.recentSignups}</div>
                  <div className="text-gray-400">Recent Signups (30d)</div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Users Table */}
          {adminData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="text-left p-4 text-gray-300">User</th>
                          <th className="text-left p-4 text-gray-300">Role</th>
                          <th className="text-left p-4 text-gray-300">Company</th>
                          <th className="text-left p-4 text-gray-300">Status</th>
                          <th className="text-left p-4 text-gray-300">Joined</th>
                          <th className="text-left p-4 text-gray-300">Last Login</th>
                          <th className="text-left p-4 text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminData.users.map((userData, index) => (
                          <tr key={userData.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                            <td className="p-4">
                              <div>
                                <div className="font-semibold text-white">{userData.name}</div>
                                <div className="text-sm text-gray-400">{userData.email}</div>
                                {userData.phone && <div className="text-xs text-gray-500">{userData.phone}</div>}
                              </div>
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  userData.role === "admin"
                                    ? "bg-purple-900/50 text-purple-300"
                                    : "bg-blue-900/50 text-blue-300"
                                }`}
                              >
                                {userData.role}
                              </span>
                            </td>
                            <td className="p-4 text-gray-300">{userData.company || "—"}</td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  userData.isActive ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
                                }`}
                              >
                                {userData.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="p-4 text-gray-300">{new Date(userData.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-gray-300">
                              {userData.lastLogin ? new Date(userData.lastLogin).toLocaleDateString() : "Never"}
                            </td>
                            <td className="p-4">
                              <Button
                                onClick={() => toggleUserStatus(userData.id, userData.isActive)}
                                variant="outline"
                                size="sm"
                                className="border-gray-600 hover:bg-gray-800"
                              >
                                {userData.isActive ? (
                                  <ToggleRight className="w-4 h-4 text-green-400" />
                                ) : (
                                  <ToggleLeft className="w-4 h-4 text-red-400" />
                                )}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {adminData.pagination.pages > 1 && (
                    <div className="p-4 border-t border-gray-800 flex justify-center space-x-2">
                      {Array.from({ length: adminData.pagination.pages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page)
                            fetchAdminData(page)
                          }}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          className={
                            page === currentPage
                              ? "bg-gradient-to-r from-blue-600 to-purple-600"
                              : "border-gray-600 hover:bg-gray-800"
                          }
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
