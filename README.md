# Store Traffic Dashboard

A real-time dashboard to monitor customer footfall (in and out) across stores. Built with Kafka, Express.js, and Next.js. Live and historical data is streamed via Kafka and displayed in a web UI.

## Features

- Real-time tracking of customers entering and exiting the store
- History table showing hourly customer flow for the past 24 hours
- Kafka used for message streaming
- Express.js backend processes Kafka messages
- Next.js frontend displays live and historical data

## Tech Stack

- Frontend: React, TypeScript, Next.js
- Backend: Node.js, Express.js, TypeScript
- Kafka: `confluentinc/cp-kafka`
- Zookeeper: `zookeeper` image
- Docker Compose

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MayankDiwate/store-traffic-dashboard.git
cd store-traffic-dashboard
```

### 2. Start Kafka and Zookeeper

```bash
docker-compose up -d
```

This starts Kafka on `localhost:9092` and Zookeeper on `localhost:2181`.

### 3. Install Dependencies

For backend and frontend:

```bash
# Server
cd server
npm install

# Client
cd ../client
pnpm install
```

### 4. Run the Server

```bash
# From server directory
npm run dev
```

### 5. Run the Client

```bash
# From client directory
pnpm run dev
```

### 6. Generate Mock Data (if applicable)

If you have a mock data generator, it will start with the backend to simulate Kafka traffic.

## Kafka Message Format

```json
{
  "store_id": 10,
  "customers_in": 2,
  "customers_out": 3,
  "time_stamp": "10.12.03"
}
```
