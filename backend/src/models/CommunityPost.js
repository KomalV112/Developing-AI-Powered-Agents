import mongoose from 'mongoose';

const communityPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

communityPostSchema.index({ title: 'text', content: 'text' });

// Change to named export
export const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);