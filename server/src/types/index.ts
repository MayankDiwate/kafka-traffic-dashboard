export interface StoreTraffic {
  store_id: number
  customers_in: number
  customers_out: number
  time_stamp: string
}

export interface HourlyTraffic {
  hour: string
  customers_in: number
  customers_out: number
  net_change: number
}

export interface KafkaConfig {
  clientId: string
  brokers: string[]
}
