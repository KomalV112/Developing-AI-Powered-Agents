import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  query: { type: String, required: true },
  response: { type: String, required: true },
  retrievedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommunityPost' }],
  timestamp: { type: Date, default: Date.now }
});

// Use named export
export const Interaction = mongoose.model('Interaction', interactionSchema);