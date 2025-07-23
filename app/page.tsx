"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  ArrowRight, TrendingUp, Users, DollarSign, BarChart3, Globe, Shield, Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import './globals.css';
// ✅ Define the type for company data
type CompanyData = {
  companyMetrics: {
    revenue: string
    growth: string
    clients: string
    deals: string
  }
  portfolioReturns: {
    annual: string
    fiveYear: string
    inception: string
  }
}

export default function PitchNDeck() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const servicesRef = useRef(null)
  const portfolioRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const statsInView = useInView(statsRef, { once: true })
  const servicesInView = useInView(servicesRef, { once: true })
  const portfolioInView = useInView(portfolioRef, { once: true })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -500])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const fetchData = async () => {
      const mockData: CompanyData = {
        companyMetrics: {
          revenue: "$2.4B",
          growth: "127%",
          clients: "500+",
          deals: "1,200+",
        },
        portfolioReturns: {
          annual: "24.7%",
          fiveYear: "18.3%",
          inception: "21.2%",
        },
      }
      setCompanyData(mockData)
    }

    fetchData()
  }, [])
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
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
            {[
              { name: "Services", href: "/services" },
              { name: "Insights", href: "/insights" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "About", href: "/about" },
              { name: "User Experience", href: "/user-experience" },
              { name: "Research", href: "/research" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className="text-gray-300 hover:text-white transition-colors relative group cursor-pointer"
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </motion.div>
              </Link>
            ))}
          </div>
          <Link href="/user-experience">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Corporate skyline with modern buildings"
            fill
            className="object-cover opacity-30"
          />
        </motion.div>

        <motion.div className="relative z-20 text-center max-w-6xl mx-auto px-6" style={{ y: textY }}>
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            REDEFINING
            <br />
            INVESTMENT
            <br />
            BANKING
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Empowering global enterprises with cutting-edge financial solutions, strategic insights, and unparalleled
            market expertise. Trusted by Fortune 500 companies worldwide.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link href="/services">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 group"
              >
                Explore Solutions
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/insights">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                View Insights
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {companyData &&
              [
                { icon: DollarSign, label: "Assets Under Management", value: companyData.companyMetrics.revenue },
                { icon: TrendingUp, label: "Annual Growth", value: companyData.companyMetrics.growth },
                { icon: Users, label: "Global Clients", value: companyData.companyMetrics.clients },
                { icon: BarChart3, label: "Successful Deals", value: companyData.companyMetrics.deals },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Performance Section */}
      <section ref={portfolioRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Portfolio Performance
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Consistent returns backed by strategic investments and market expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={portfolioInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Financial charts and graphs showing portfolio performance"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={portfolioInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {companyData &&
                [
                  { label: "Annual Return", value: "24.7%", desc: "Consistent outperformance" },
                  { label: "5-Year Average", value: "18.3%", desc: "Long-term stability" },
                  { label: "Since Inception", value: "21.2%", desc: "Proven track record" },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="flex items-center justify-between p-6 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-white">{metric.label}</h3>
                      <p className="text-gray-400">{metric.desc}</p>
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      {metric.value}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section ref={servicesRef} className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive financial services tailored for the modern enterprise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Markets",
                description:
                  "Navigate international markets with our expert guidance and local insights across 50+ countries.",
                image:
                  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
              {
                icon: Shield,
                title: "Risk Management",
                description:
                  "Advanced risk assessment and mitigation strategies to protect your investments and maximize returns.",
                image:
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
              {
                icon: Zap,
                title: "Digital Innovation",
                description:
                  "Cutting-edge fintech solutions and digital transformation services for the future of finance.",
                image:
                  "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{service.description}</p>
                    <Link href="/services">
                      <motion.div
                        className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.div>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <motion.h2
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join the ranks of industry leaders who trust PITCHNDECK for their financial success.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-12 py-4 group"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/user-experience">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                Start Your Journey
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
                PITCHNDECK
              </div>
              <p className="text-gray-400">Redefining Investment Banking for the Digital Age</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                  Investment Banking
                </Link>
                <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                  Asset Management
                </Link>
                <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                  Risk Advisory
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="/insights" className="block text-gray-400 hover:text-white transition-colors">
                  Insights
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="space-y-2">
                <Link href="/user-experience" className="block text-gray-400 hover:text-white transition-colors">
                  Client Portal
                </Link>
                <Link href="/research" className="block text-gray-400 hover:text-white transition-colors">
                  Research
                </Link>
                <Link href="/portfolio" className="block text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 PITCHNDECK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
