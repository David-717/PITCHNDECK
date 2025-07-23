import { type NextRequest, NextResponse } from "next/server"

// Enhanced GraphQL endpoint with comprehensive financial data
export async function POST(request: NextRequest) {
  const body = await request.json()

  // Mock comprehensive financial data
  const mockData = {
    data: {
      companyMetrics: {
        revenue: "$2.4B",
        growth: "127%",
        clients: "500+",
        deals: "1,200+",
        sharePrice: 90,
        marketCap: "$12.8B",
        dividend: 4.0,
        dividendYield: "4.4%",
      },
      revenueData: [
        { year: "2020", value: 850, growth: 8.5 },
        { year: "2021", value: 1200, growth: 41.2 },
        { year: "2022", value: 1650, growth: 37.5 },
        { year: "2023", value: 2100, growth: 27.3 },
        { year: "2024", value: 2400, growth: 14.3 },
      ],
      salesData: [
        { quarter: "Q1 2024", sales: 580, growth: 12.5, target: 550 },
        { quarter: "Q2 2024", sales: 620, growth: 15.2, target: 600 },
        { quarter: "Q3 2024", sales: 680, growth: 18.7, target: 650 },
        { quarter: "Q4 2024", sales: 720, growth: 22.1, target: 700 },
      ],
      stakeholderRevenue: [
        { name: "BlackRock", revenue: 450, percentage: 28, investment: "2.8B" },
        { name: "State Street", revenue: 320, percentage: 20, investment: "1.9B" },
        { name: "Vanguard", revenue: 280, percentage: 17, investment: "1.5B" },
        { name: "Fidelity", revenue: 240, percentage: 15, investment: "1.2B" },
        { name: "JP Morgan", revenue: 200, percentage: 12, investment: "950M" },
        { name: "Morgan Stanley", revenue: 130, percentage: 8, investment: "720M" },
      ],
      portfolioPerformance: [
        { month: "Jan", value: 180, benchmark: 165 },
        { month: "Feb", value: 220, benchmark: 190 },
        { month: "Mar", value: 280, benchmark: 245 },
        { month: "Apr", value: 350, benchmark: 310 },
        { month: "May", value: 420, benchmark: 380 },
        { month: "Jun", value: 480, benchmark: 440 },
        { month: "Jul", value: 520, benchmark: 485 },
        { month: "Aug", value: 580, benchmark: 530 },
        { month: "Sep", value: 640, benchmark: 590 },
        { month: "Oct", value: 720, benchmark: 650 },
        { month: "Nov", value: 780, benchmark: 710 },
        { month: "Dec", value: 850, benchmark: 780 },
      ],
      dividendHistory: [
        { year: "2020", dividend: 2.4, payout: 65 },
        { year: "2021", dividend: 2.8, payout: 68 },
        { year: "2022", dividend: 3.2, payout: 70 },
        { year: "2023", dividend: 3.6, payout: 72 },
        { year: "2024", dividend: 4.0, payout: 75 },
      ],
      investorMetrics: {
        totalInvestors: 1250,
        institutionalClients: 150,
        retailClients: 1100,
        averageInvestment: "2.8M",
        totalAUM: "45.2B",
        managementFee: "1.25%",
        performanceFee: "20%",
      },
    },
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(mockData)
}

export async function GET() {
  // Return schema information for GraphQL introspection
  const schema = {
    types: [
      {
        name: "CompanyMetrics",
        fields: ["revenue", "growth", "clients", "deals", "sharePrice", "marketCap"],
      },
      {
        name: "RevenueData",
        fields: ["year", "value", "growth"],
      },
      {
        name: "SalesData",
        fields: ["quarter", "sales", "growth", "target"],
      },
      {
        name: "StakeholderRevenue",
        fields: ["name", "revenue", "percentage", "investment"],
      },
    ],
  }

  return NextResponse.json({ schema })
}
