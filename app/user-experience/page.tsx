"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function UserExperiencePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    investmentAmount: "",
    investmentType: "",
    riskTolerance: "",
    investmentGoals: "",
    timeHorizon: "",
    additionalInfo: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }

    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          className="text-center max-w-2xl mx-auto px-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <ArrowRight className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Welcome to PITCHNDECK!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for joining our exclusive investment platform. Our team will contact you within 24 hours to
            discuss your investment strategy.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    )
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
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/insights" className="text-gray-300 hover:text-white transition-colors">
              Insights
            </Link>
          </div>
        </div>
      </motion.nav>

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              JOIN PITCHNDECK
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Begin your journey with institutional-grade investment solutions. Complete your profile to access
              exclusive opportunities.
            </p>
          </motion.div>

          {/* Investment Benefits */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                icon: TrendingUp,
                title: "Premium Returns",
                description: "Average 18-25% annual returns across diversified portfolios",
              },
              {
                icon: Shield,
                title: "Risk Management",
                description: "Advanced hedging strategies and institutional-grade risk controls",
              },
              {
                icon: DollarSign,
                title: "Exclusive Access",
                description: "Private equity, hedge funds, and alternative investment opportunities",
              },
            ].map((benefit, index) => (
              <Card
                key={benefit.title}
                className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Investment Profile Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">
                        Company/Organization
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  {/* Investment Information */}
                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Investment Details</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="investmentAmount" className="text-white">
                          Investment Amount *
                        </Label>
                        <Select onValueChange={(value) => handleInputChange("investmentAmount", value)}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select investment range" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                            <SelectItem value="10m+">$10M+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investmentType" className="text-white">
                          Investment Type *
                        </Label>
                        <Select onValueChange={(value) => handleInputChange("investmentType", value)}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select investment type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="private-equity">Private Equity</SelectItem>
                            <SelectItem value="hedge-funds">Hedge Funds</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="fixed-income">Fixed Income</SelectItem>
                            <SelectItem value="mixed-portfolio">Mixed Portfolio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="riskTolerance" className="text-white">
                          Risk Tolerance *
                        </Label>
                        <Select onValueChange={(value) => handleInputChange("riskTolerance", value)}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select risk tolerance" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="conservative">Conservative</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="aggressive">Aggressive</SelectItem>
                            <SelectItem value="very-aggressive">Very Aggressive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeHorizon" className="text-white">
                          Investment Time Horizon *
                        </Label>
                        <Select onValueChange={(value) => handleInputChange("timeHorizon", value)}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select time horizon" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="1-3-years">1-3 Years</SelectItem>
                            <SelectItem value="3-5-years">3-5 Years</SelectItem>
                            <SelectItem value="5-10-years">5-10 Years</SelectItem>
                            <SelectItem value="10+-years">10+ Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2 mt-6">
                      <Label htmlFor="investmentGoals" className="text-white">
                        Investment Goals *
                      </Label>
                      <Textarea
                        id="investmentGoals"
                        required
                        value={formData.investmentGoals}
                        onChange={(e) => handleInputChange("investmentGoals", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 min-h-[100px]"
                        placeholder="Describe your investment goals and objectives..."
                      />
                    </div>

                    <div className="space-y-2 mt-6">
                      <Label htmlFor="additionalInfo" className="text-white">
                        Additional Information
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 min-h-[80px]"
                        placeholder="Any additional information you'd like to share..."
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-4 group"
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          Begin Investment Journey
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-400 mb-4">Trusted by leading institutions worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-sm text-gray-500">SEC Registered</div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="text-sm text-gray-500">FINRA Member</div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="text-sm text-gray-500">SIPC Protected</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
