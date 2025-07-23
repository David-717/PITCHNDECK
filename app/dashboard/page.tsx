"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, DollarSign, BarChart3, User, LogOut, Settings, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardPage() {
  const { user, loading, signout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signout()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
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
            <div className="hidden md:flex items-center space-x-2 text-gray-300">
              <User className="w-4 h-4" />
              <span>Welcome, {user.name}</span>
              {user.role === "admin" && (
                <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full text-xs ml-2">Admin</span>
              )}
            </div>
            {user.role === "admin" && (
              <Link href="/admin">
                <Button variant="outline" className="border-purple-600 hover:bg-purple-800 bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            )}
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-gray-600 hover:bg-gray-800 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </motion.nav>

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Welcome Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              WELCOME TO YOUR
              <br />
              DASHBOARD
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Manage your investments, track performance, and access exclusive opportunities
            </p>
          </motion.div>

          {/* User Info Card */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="text-gray-400 text-sm">Name</label>
                    <p className="text-white text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Role</label>
                    <p className="text-white text-lg capitalize">
                      {user.role}
                      {user.role === "admin" && (
                        <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full text-xs ml-2">
                          Administrator
                        </span>
                      )}
                    </p>
                  </div>
                  {user.company && (
                    <div>
                      <label className="text-gray-400 text-sm">Company</label>
                      <p className="text-white text-lg">{user.company}</p>
                    </div>
                  )}
                  {user.phone && (
                    <div>
                      <label className="text-gray-400 text-sm">Phone</label>
                      <p className="text-white text-lg">{user.phone}</p>
                    </div>
                  )}
                  {user.lastLogin && (
                    <div>
                      <label className="text-gray-400 text-sm">Last Login</label>
                      <p className="text-white text-lg">{new Date(user.lastLogin).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Portfolio Overview */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">
                  ${user.portfolioValue?.toLocaleString() || "0"}
                </div>
                <div className="text-gray-400">Portfolio Value</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{user.totalReturns?.toFixed(1) || "0.0"}%</div>
                <div className="text-gray-400">Total Returns</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">Active</div>
                <div className="text-gray-400">Account Status</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/portfolio">
              <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">View Portfolio</h3>
                  <p className="text-gray-400 text-sm">Manage your investments</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/services">
              <Card className="bg-gray-900/50 border-gray-800 hover:border-green-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">Investment Services</h3>
                  <p className="text-gray-400 text-sm">Explore opportunities</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/insights">
              <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">Market Insights</h3>
                  <p className="text-gray-400 text-sm">Latest analysis</p>
                </CardContent>
              </Card>
            </Link>

            {user.role === "admin" ? (
              <Link href="/admin">
                <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold text-white mb-2">Admin Panel</h3>
                    <p className="text-gray-400 text-sm">Manage users & system</p>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Link href="/contact">
                <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Settings className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
                    <p className="text-gray-400 text-sm">Get assistance</p>
                  </CardContent>
                </Card>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
