"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Award, Building2, FileText, BarChart3, DollarSign, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import "../styles/globals.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import Image from "next/image"
import Link from "next/link"
type CompanyData = {
  sharePrice: number
  marketCap: string
  revenue: { year: string; value: number }[]
  salesData: { quarter: string; sales: number; growth: number }[]
  stakeholderRevenue: { name: string; revenue: number; percentage: number }[]
  dividendHistory: { year: string; dividend: number }[]
}

export default function AboutPage() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const [selectedChart, setSelectedChart] = useState("revenue")

  useEffect(() => {
    // Simulate GraphQL data fetch
    const fetchCompanyData = async () => {
      const mockData = {
        sharePrice: 90,
        marketCap: "$12.8B",
        revenue: [
          { year: "2020", value: 850 },
          { year: "2021", value: 1200 },
          { year: "2022", value: 1650 },
          { year: "2023", value: 2100 },
          { year: "2024", value: 2400 },
        ],
        salesData: [
          { quarter: "Q1 2024", sales: 580, growth: 12.5 },
          { quarter: "Q2 2024", sales: 620, growth: 15.2 },
          { quarter: "Q3 2024", sales: 680, growth: 18.7 },
          { quarter: "Q4 2024", sales: 720, growth: 22.1 },
        ],
        stakeholderRevenue: [
          { name: "BlackRock", revenue: 450, percentage: 28 },
          { name: "State Street", revenue: 320, percentage: 20 },
          { name: "Vanguard", revenue: 280, percentage: 17 },
          { name: "Fidelity", revenue: 240, percentage: 15 },
          { name: "Others", revenue: 320, percentage: 20 },
        ],
        dividendHistory: [
          { year: "2020", dividend: 2.4 },
          { year: "2021", dividend: 2.8 },
          { year: "2022", dividend: 3.2 },
          { year: "2023", dividend: 3.6 },
          { year: "2024", dividend: 4.0 },
        ],
      }
      setCompanyData(mockData)
    }
    fetchCompanyData()
  }, [])

  const chartColors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"]

  const companyPolicies = [
    {
      title: "Investment Philosophy",
      description: "Long-term value creation through disciplined investment strategies and risk management",
      icon: TrendingUp,
    },
    {
      title: "ESG Commitment",
      description: "Environmental, Social, and Governance principles integrated into all investment decisions",
      icon: Award,
    },
    {
      title: "Client-Centric Approach",
      description: "Tailored solutions designed to meet unique client objectives and risk profiles",
      icon: Users,
    },
    {
      title: "Innovation Leadership",
      description: "Leveraging cutting-edge technology and data analytics for superior investment outcomes",
      icon: Building2,
    },
  ]

  const investorRelations = [
    {
      title: "Annual Report 2024",
      type: "PDF",
      date: "March 2024",
      size: "2.4 MB",
      icon: FileText,
    },
    {
      title: "Q4 2024 Earnings",
      type: "PDF",
      date: "January 2024",
      size: "1.8 MB",
      icon: BarChart3,
    },
    {
      title: "SEC Filing 10-K",
      type: "PDF",
      date: "February 2024",
      size: "3.2 MB",
      icon: FileText,
    },
    {
      title: "Proxy Statement",
      type: "PDF",
      date: "April 2024",
      size: "1.5 MB",
      icon: FileText,
    },
  ]

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
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/insights" className="text-gray-300 hover:text-white transition-colors">
              Insights
            </Link>
            <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
              Portfolio
            </Link>
          </div>
        </div>
      </motion.nav>

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              ABOUT
              <br />
              PITCHNDECK
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Leading the future of investment banking with innovative solutions and unparalleled expertise
            </p>
          </motion.div>

          {/* Company Overview */}
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Founded in 2010, PITCHNDECK has grown from a boutique investment firm to a global financial powerhouse,
                managing over $45 billion in assets and serving institutional clients across 25 countries.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Our commitment to innovation, transparency, and client success has made us the preferred partner for
                Fortune 500 companies and high-net-worth individuals seeking sophisticated investment solutions.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">14</div>
                  <div className="text-gray-400">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">$45B</div>
                  <div className="text-gray-400">AUM</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">25</div>
                  <div className="text-gray-400">Countries</div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Modern office building"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Stock Information */}
          {companyData && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Stock Information
              </h2>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gray-900/50 border-gray-800 hover:border-green-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">${companyData.sharePrice}</div>
                    <div className="text-gray-400">Share Price</div>
                    <div className="text-green-400 text-sm mt-1">+5.2% Today</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{companyData.marketCap}</div>
                    <div className="text-gray-400">Market Cap</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">$4.00</div>
                    <div className="text-gray-400">Annual Dividend</div>
                    <div className="text-purple-400 text-sm mt-1">4.4% Yield</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">Mar 15</div>
                    <div className="text-gray-400">Next Earnings</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Interactive Charts */}
          {companyData && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Financial Performance
              </h2>

              <div className="flex justify-center mb-8">
                <div className="flex space-x-4">
                  {[
                    { key: "revenue", label: "Revenue Growth" },
                    { key: "sales", label: "Quarterly Sales" },
                    { key: "stakeholder", label: "Stakeholder Revenue" },
                    { key: "dividend", label: "Dividend History" },
                  ].map((chart) => (
                    <Button
                      key={chart.key}
                      onClick={() => setSelectedChart(chart.key)}
                      variant={selectedChart === chart.key ? "default" : "outline"}
                      className={
                        selectedChart === chart.key
                          ? "bg-gradient-to-r from-blue-600 to-purple-600"
                          : "border-gray-600 hover:bg-gray-800"
                      }
                    >
                      {chart.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-8">
                  <div className="h-96">
                    {selectedChart === "revenue" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={companyData.revenue}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="year" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#F3F4F6" }}
                          />
                          <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#colorRevenue)" />
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    )}

                    {selectedChart === "sales" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={companyData.salesData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="quarter" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#F3F4F6" }}
                          />
                          <Bar dataKey="sales" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    {selectedChart === "stakeholder" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={companyData.stakeholderRevenue}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="revenue"
                            label={({ name, percentage }) => `${name} ${percentage}%`}
                          >
                            {companyData.stakeholderRevenue.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    )}

                    {selectedChart === "dividend" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={companyData.dividendHistory}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="year" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#F3F4F6" }}
                          />
                          <Line type="monotone" dataKey="dividend" stroke="#10B981" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Company Policies */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Policies & Values
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {companyPolicies.map((policy, index) => (
                <motion.div
                  key={policy.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-500 group h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                          <policy.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{policy.title}</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{policy.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Investor Relations */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Investor Relations
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {investorRelations.map((document, index) => (
                <motion.div
                  key={document.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <document.icon className="w-8 h-8 text-blue-400" />
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{document.type}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {document.title}
                      </h3>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>{document.date}</div>
                        <div>{document.size}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
