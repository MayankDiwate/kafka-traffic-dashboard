// Express routes for traffic data
import { Router } from "express"
import { getHourlyTrafficData } from "../services/trafficService"

const router = Router()

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Get historical traffic data for a store
router.get("/history/:storeId", (req, res) => {
  const storeId = Number.parseInt(req.params.storeId)
  const hourlyData = getHourlyTrafficData(storeId)
  res.status(200).json(hourlyData)
})

export default router
