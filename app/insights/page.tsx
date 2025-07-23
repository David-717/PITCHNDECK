"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Award, Globe, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function InsightsPage() {
  const stakeholders = [
    {
      name: "BlackRock",
      investment: "$2.8B",
      stake: "15.2%",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/BlackRock_Logo.svg/2560px-BlackRock_Logo.svg.png",
      description: "World's largest asset manager",
      website: "https://www.blackrock.com",
    },
    {
      name: "State Street",
      investment: "$1.9B",
      stake: "12.8%",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/State_Street_Corporation_logo.svg/2560px-State_Street_Corporation_logo.svg.png",
      description: "Global financial services leader",
      website: "https://www.statestreet.com",
    },
    {
      name: "Vanguard Group",
      investment: "$1.5B",
      stake: "9.7%",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Vanguard_logo.svg/2560px-Vanguard_logo.svg.png",
      description: "Investment management company",
      website: "https://www.vanguard.com",
    },
    {
      name: "Fidelity Investments",
      investment: "$1.2B",
      stake: "8.4%",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Fidelity_Investments_logo.svg/2560px-Fidelity_Investments_logo.svg.png",
      description: "Multinational financial services",
      website: "https://www.fidelity.com",
    },
  ]

  const alumni = [
    {
      name: "Sarah Chen",
      position: "Former Goldman Sachs MD",
      current: "CEO, TechVentures",
      investment: "$500M",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c6d4e6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Michael Rodriguez",
      position: "Ex-JP Morgan VP",
      current: "Founder, GreenCapital",
      investment: "$350M",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "David Kim",
      position: "Former Morgan Stanley Director",
      current: "Partner, Innovation Fund",
      investment: "$280M",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Lisa Thompson",
      position: "Ex-Blackstone Principal",
      current: "Managing Director, Growth Equity",
      investment: "$420M",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ]

  const marketInsights = [
    {
      title: "Q4 2024 Market Outlook",
      category: "Market Analysis",
      date: "December 2024",
      summary: "Comprehensive analysis of global market trends and investment opportunities for the upcoming quarter.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "ESG Investment Trends",
      category: "Sustainable Finance",
      date: "November 2024",
      summary:
        "Deep dive into environmental, social, and governance investment strategies and their performance metrics.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Emerging Markets Report",
      category: "Global Markets",
      date: "October 2024",
      summary: "Analysis of emerging market opportunities and risk factors for institutional investors.",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
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
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              MARKET
              <br />
              INSIGHTS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              Strategic intelligence from industry leaders and institutional investors who trust our expertise
            </p>
          </motion.div>
        </div>
      </section>

      {/* Major Stakeholders Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Major Stakeholders
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Backed by the world's leading financial institutions and investment firms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {stakeholders.map((stakeholder, index) => (
              <motion.div
                key={stakeholder.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-500 group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <a href={stakeholder.website} target="_blank" rel="noopener noreferrer">
                          <Image
                            src={stakeholder.logo || "/placeholder.svg"}
                            alt={stakeholder.name}
                            width={200}
                            height={100}
                            className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
                          />
                        </a>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{stakeholder.investment}</div>
                        <div className="text-gray-400">{stakeholder.stake} stake</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{stakeholder.name}</h3>
                    <p className="text-gray-400">{stakeholder.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Network Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Alumni Network
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Distinguished professionals who have invested with us and continue to drive market innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {alumni.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden">
                  <div className="relative">
                    <Image
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{person.name}</h3>
                    <p className="text-blue-400 text-sm mb-1">{person.position}</p>
                    <p className="text-gray-400 text-sm mb-3">{person.current}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-semibold">{person.investment}</span>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Latest Market Insights
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Expert analysis and strategic insights from our research team
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {marketInsights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={insight.image || "/placeholder.svg"}
                      alt={insight.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {insight.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-gray-400 text-sm mb-2">{insight.date}</div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{insight.summary}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-blue-900/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {[
              { icon: DollarSign, label: "Total AUM", value: "$12.8B" },
              { icon: TrendingUp, label: "5-Year Return", value: "18.7%" },
              { icon: Users, label: "Institutional Clients", value: "150+" },
              { icon: Globe, label: "Global Presence", value: "25 Countries" },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <metric.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-gray-400">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
