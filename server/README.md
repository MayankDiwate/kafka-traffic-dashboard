# Store Traffic Dashboard - Backend Server

This is the backend server for the Store Traffic Dashboard application. It processes customer traffic data from Kafka and provides real-time updates to connected clients via WebSockets.

## Project Structure

\`\`\`
src/
├── config/         # Configuration settings
├── middleware/     # Express middleware
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript interfaces
├── utils/          # Utility functions
├── app.ts          # Express application setup
└── index.ts        # Application entry point
\`\`\`

## Getting Started

1. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

2. Create a `.env` file based on `.env.example`:
   \`\`\`
   cp .env.example .env
   \`\`\`

3. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

4. Build for production:
   \`\`\`
   npm run build
   \`\`\`

5. Start the production server:
   \`\`\`
   npm start
   \`\`\`

## Environment Variables

- `PORT`: Server port (default: 3001)
- `CLIENT_URL`: Frontend URL for CORS (default: http://localhost:3000)
- `KAFKA_BROKER`: Kafka broker address
- `KAFKA_TOPIC`: Kafka topic to consume
- `KAFKA_SSL`: Enable SSL for Kafka connection
- `KAFKA_USERNAME`: Kafka SASL username
- `KAFKA_PASSWORD`: Kafka SASL password
- `MOCK_DATA`: Enable mock data generation for testing
