import { TextLoader } from 'langchain/document_loaders';
import { GeminiClient } from '../utils/gemini-client.js';
// Change from default import to named import
import { CommunityPost } from '../models/CommunityPost.js';
import { Interaction } from '../models/Interaction.js';


export class AIAgentService {
  constructor() {
    this.gemini = new GeminiClient(process.env.GEMINI_API_KEY);
  }

  async processQuery(input, userId) {
    // 1. Retrieve relevant documents
    const loader = new TextLoader('community_posts.txt');
    const docs = await loader.load();
    
    // 2. Search community posts
    const keywords = this.extractKeywords(input);
    const relevantPosts = await CommunityPost.find({
      $text: { $search: keywords.join(' ') }
    }).limit(3);

    // 3. Generate response
    const context = docs.map(d => d.pageContent).join('\n');
    const prompt = `User asked: ${input}\nContext: ${context}\nGenerate helpful response:`;
    const response = await this.gemini.generate(prompt);

    // 4. Store interaction
    await Interaction.create({
      userId,
      query: input,
      response: response.text,
      retrievedPosts: relevantPosts.map(p => p._id)
    });

    // 5. Generate follow-ups
    const questionsPrompt = `Generate 3 follow-up questions based on: ${response.text}`;
    const suggestedQuestions = await this.gemini.generate(questionsPrompt);

    return {
      text: response.text,
      suggestedQuestions: JSON.parse(suggestedQuestions),
      retrievedPosts: relevantPosts
    };
  }

  extractKeywords(input) {
    // Simple keyword extraction (replace with proper NLP processing)
    return input.toLowerCase().split(' ').filter(word => word.length > 3);
  }
}