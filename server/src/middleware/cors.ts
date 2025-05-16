// CORS middleware
import cors from "cors"
import config from "../config"

export default cors({
  origin: config.server.clientUrl,
  methods: ["GET", "POST"],
  credentials: true,
})
