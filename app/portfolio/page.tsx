"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, DollarSign, BarChart3, Plus, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"

// === Type Definitions ===
type PortfolioStats = {
  totalPortfolios: number
  totalAUM: string
  avgReturn: string
  activeInvestors: number
}

type InstitutionalPortfolio = {
  id: string
  name: string
  logo: string
  aum: string
  performance: string
  description: string
  features: string[]
  website: string
}

type NewPortfolio = {
  name: string
  initialInvestment: string
  riskLevel: string
  investmentGoals: string
  timeHorizon: string
}

export default function PortfolioPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<InstitutionalPortfolio | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [portfolioData, setPortfolioData] = useState<PortfolioStats | null>(null)

  const [newPortfolio, setNewPortfolio] = useState<NewPortfolio>({
    name: "",
    initialInvestment: "",
    riskLevel: "",
    investmentGoals: "",
    timeHorizon: "",
  })

  const institutionalPortfolios: InstitutionalPortfolio[] = [
    {
      id: "morgan-stanley",
      name: "Morgan Stanley",
      logo : "https://upload.wikimedia.org/wikipedia/commons/e/ed/Morgan_Stanley_Logo_2024.png",
      aum: "$4.9T",
      performance: "+12.4%",
      description: "Global investment banking and wealth management",
      features: ["Investment Banking", "Wealth Management", "Institutional Securities", "Investment Management"],
      website: "https://www.morganstanley.com",
    },
    {
      id: "jp-morgan",
      name: "JPMorgan Chase",
      logo: "https://upload.wikimedia.org/wikipedia/commons/??/??/Morgan_Stanley_Logo_2024.svg",
      aum: "$3.8T",
      performance: "+15.2%",
      description: "Leading global financial services firm",
      features: ["Corporate Banking", "Investment Banking", "Asset Management", "Private Banking"],
      website: "https://www.jpmorgan.com",
    },
    {
      id: "blackrock",
      name: "BlackRock",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Logo_of_JPMorganChase_2024.svg",
      aum: "$10.0T",
      performance: "+18.7%",
      description: "World's largest asset manager",
      features: ["ETF Management", "Risk Management", "Alternative Investments", "Technology Solutions"],
      website: "https://www.blackrock.com",
    },
    {
      id: "goldman-sachs",
      name: "Goldman Sachs",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/2560px-Goldman_Sachs.svg.png",
      aum: "$2.5T",
      performance: "+14.8%",
      description: "Premier investment banking and securities firm",
      features: ["Investment Banking", "Securities Trading", "Asset Management", "Consumer Banking"],
      website: "https://www.goldmansachs.com",
    },
  ]

  useEffect(() => {
    const fetchPortfolioData = async () => {
      const mockData: PortfolioStats = {
        totalPortfolios: 847,
        totalAUM: "$45.2B",
        avgReturn: "16.8%",
        activeInvestors: 1250,
      }
      setPortfolioData(mockData)
    }

    fetchPortfolioData()
  }, [])

  const handleAddPortfolio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Adding portfolio:", newPortfolio)
    setShowAddForm(false)
    setNewPortfolio({
      name: "",
      initialInvestment: "",
      riskLevel: "",
      investmentGoals: "",
      timeHorizon: "",
    })
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
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
            <Link href="/insights" className="text-gray-300 hover:text-white transition-colors">Insights</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              PORTFOLIO<br />MANAGEMENT
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Institutional-grade portfolio management with access to premier investment strategies
            </p>
          </motion.div>

          {portfolioData && (
            <motion.div className="grid md:grid-cols-4 gap-6 mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              {[
                { label: "Total Portfolios", value: portfolioData.totalPortfolios, icon: BarChart3 },
                { label: "Assets Under Management", value: portfolioData.totalAUM, icon: DollarSign },
                { label: "Average Return", value: portfolioData.avgReturn, icon: TrendingUp },
                { label: "Active Investors", value: portfolioData.activeInvestors, icon: TrendingUp },
              ].map((stat, index) => (
                <Card key={stat.label} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Add Portfolio Button */}
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Button onClick={() => setShowAddForm(true)} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-4 group">
              <Plus className="w-5 h-5 mr-2" />
              Create New Portfolio
            </Button>
          </motion.div>

          {/* Add Portfolio Form */}
          {showAddForm && (
            <motion.div className="mb-16" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <Card className="bg-gray-900/50 border-gray-800 max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Create Your Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleAddPortfolio} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="portfolioName" className="text-white">Portfolio Name</Label>
                      <Input id="portfolioName" value={newPortfolio.name} onChange={(e) => setNewPortfolio({ ...newPortfolio, name: e.target.value })} className="bg-gray-800 border-gray-700 text-white" placeholder="Enter portfolio name" required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-white">Initial Investment</Label>
                        <Select onValueChange={(value) => setNewPortfolio({ ...newPortfolio, initialInvestment: value })}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select amount" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="5m+">$5M+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Risk Level</Label>
                        <Select onValueChange={(value) => setNewPortfolio({ ...newPortfolio, riskLevel: value })}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select risk level" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="conservative">Conservative</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="aggressive">Aggressive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">Create Portfolio</Button>
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="border-gray-600">Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Institutional Cards */}
          <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Institutional Partners
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {institutionalPortfolios.map((portfolio, index) => (
                <motion.div key={portfolio.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <a href={portfolio.website} target="_blank" rel="noopener noreferrer">
                          <Image src={portfolio.logo || "/placeholder.svg"} alt={portfolio.name} width={200} height={80} className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300" />
                        </a>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{portfolio.aum}</div>
                          <div className="text-gray-400 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {portfolio.performance}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{portfolio.name}</h3>
                      <p className="text-gray-400 mb-4">{portfolio.description}</p>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {portfolio.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-gray-300 text-sm">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={() => setSelectedPortfolio(portfolio)} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <a href={portfolio.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-800">
                            Visit Website
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
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
