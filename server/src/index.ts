import express from "express"
import http from "http"
import { Server } from "socket.io"
import config from "./config"
import corsMiddleware from "./middleware/cors"
import trafficRoutes from "./routes/trafficRoutes"
import { initializeKafka } from "./services/kafkaService"
import { startMockDataGenerator } from "./utils/mockData"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: config.server.clientUrl,
    methods: ["GET", "POST"],
    credentials: true,
  },
})

app.use(corsMiddleware)
app.use(express.json())

app.use("/api", trafficRoutes)

io.on("connection", (socket) => {
  console.log("Client connected")

  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

const PORT = process.env.PORT || 3001;

export const startServer = async (): Promise<void> => {
  try {
    // Connect to Kafka
    await initializeKafka(io)

    startMockDataGenerator(io)

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
};

startServer().catch((error) => {
  console.error("Server startup failed:", error)
  process.exit(1)
})
