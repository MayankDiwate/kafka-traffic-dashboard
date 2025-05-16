// Kafka consumer service
import { Kafka } from "kafkajs"
import type { Server } from "socket.io"
import config from "../config"
import type { KafkaConfig, StoreTraffic } from "../types"
import { storeTrafficData } from "./trafficService"

let io: Server

export const initializeKafka = async (socketIo: Server): Promise<void> => {
  io = socketIo

  const kafkaConfig: KafkaConfig = {
    clientId: config.kafka.clientId,
    brokers: config.kafka.brokers,
  }

  const kafka = new Kafka(kafkaConfig)
  const consumer = kafka.consumer({ groupId: "store-traffic-group" })

  try {
    await consumer.connect()
    await consumer.subscribe({ topic: config.kafka.topic, fromBeginning: false })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
          try {
            const trafficUpdate: StoreTraffic = JSON.parse(message.value.toString())

            storeTrafficData(trafficUpdate)

            io.emit("trafficUpdate", trafficUpdate)

            console.log(`Processed message: ${JSON.stringify(trafficUpdate)}`)
          } catch (error) {
            console.error("Error processing message:", error)
          }
        }
      },
    })

    console.log("Connected to Kafka")
  } catch (error) {
    console.error("Failed to connect to Kafka:", error)
  }
}
