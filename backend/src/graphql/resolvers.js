import { AIAgentService } from '../services/ai-agent.services.js';

const aiAgentService = new AIAgentService();

export const resolvers = {
  Query: {
    communityAIQuery: async (_, { input }) => {
      try {
        // In production, get userId from context
        const userId = 'temp-user-id'; 
        return await aiAgentService.processQuery(input, userId);
      } catch (error) {
        throw new Error(`AI query failed: ${error.message}`);
      }
    }
  }
};