import dotenv from "dotenv"

// Load environment variables
dotenv.config()

const config = {
  server: {
    port: process.env.PORT || 3001,
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  },
  kafka: {
    clientId: "store-traffic-app",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
    topic: process.env.KAFKA_TOPIC || "store-traffic",
    // ssl: process.env.KAFKA_SSL === "true",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  // mockData: process.env.MOCK_DATA === "true",
}

export default config
