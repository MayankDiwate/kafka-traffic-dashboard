import type { Server } from "socket.io"
import { generateMockTrafficData, storeTrafficData } from "../services/trafficService"

export const startMockDataGenerator = (io: Server): NodeJS.Timeout => {
  console.log("Starting mock data generator")

  return setInterval(() => {
    const trafficUpdate = generateMockTrafficData()

    if (trafficUpdate) {
      storeTrafficData(trafficUpdate)
      io.emit("trafficUpdate", trafficUpdate)
      console.log(`Emitted mock data: ${JSON.stringify(trafficUpdate)}`)
    }
  }, 3000)
}
