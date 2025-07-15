// backend/src/server.js
import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import connectDB from './config/db.js';
import { resolvers } from './graphql/resolvers.js';
import { buildSchema } from 'graphql';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Create __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express server
const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Connect to MongoDB
connectDB();

// Read GraphQL schema from file
const schemaPath = join(__dirname, 'graphql', 'schema.graphql');

// Verify schema file exists
if (!fs.existsSync(schemaPath)) {
  throw new Error(`Schema file missing at ${schemaPath}`);
}

const typeDefs = fs.readFileSync(schemaPath, 'utf-8');
const schema = buildSchema(typeDefs);

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: process.env.NODE_ENV === 'development'
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});