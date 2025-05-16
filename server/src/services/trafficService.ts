import type { HourlyTraffic, StoreTraffic } from "../types"

const trafficData: Record<number, StoreTraffic[]> = {}

export const storeTrafficData = (data: StoreTraffic): void => {
  if (!trafficData[data.store_id]) {
    trafficData[data.store_id] = []
  }

  if (!data.time_stamp) {
    const now = new Date()
    data.time_stamp = `${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`
  }

  trafficData[data.store_id].push(data)
}

export const getHourlyTrafficData = (storeId: number): HourlyTraffic[] => {
  if (!trafficData[storeId]) {
    return []
  }

  const hourlyData: Record<string, HourlyTraffic> = {}

  trafficData[storeId].forEach((entry) => {
    let hour: string

    if (entry.time_stamp.includes(".")) {
      // Handle format like "10.12.03"
      const [hours] = entry.time_stamp.split(".")
      hour = `${hours}:00`
    } else {
      // Handle ISO string
      const date = new Date(entry.time_stamp)
      hour = `${date.getHours()}:00`
    }

    if (!hourlyData[hour]) {
      hourlyData[hour] = {
        hour,
        customers_in: 0,
        customers_out: 0,
        net_change: 0,
      }
    }

    hourlyData[hour].customers_in += entry.customers_in
    hourlyData[hour].customers_out += entry.customers_out
    hourlyData[hour].net_change += entry.customers_in - entry.customers_out
  })

  return Object.values(hourlyData).sort((a, b) => {
    const hourA = Number.parseInt(a.hour.split(":")[0])
    const hourB = Number.parseInt(b.hour.split(":")[0])
    return hourA - hourB
  })
}

export const generateMockTrafficData = (): StoreTraffic | null => {
  const storeId = 10
  const customersIn = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0
  const customersOut = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0

  if (customersIn > 0 || customersOut > 0) {
    const now = new Date()
    return {
      store_id: storeId,
      customers_in: customersIn,
      customers_out: customersOut,
      time_stamp: `${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`,
    }
  }

  return null
}
