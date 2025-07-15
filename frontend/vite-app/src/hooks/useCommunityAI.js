import { gql, useMutation } from '@apollo/client';

export const COMMUNITY_AI_QUERY = gql`
  query CommunityAIQuery($input: String!) {
    communityAIQuery(input: $input) {
      text
      suggestedQuestions
      retrievedPosts {
        id
        title
        content
        author
        createdAt
      }
    }
  }
`;

export const useCommunityAI = () => {
  const [executeQuery, { data, loading, error }] = useMutation(COMMUNITY_AI_QUERY);
  
  return {
    executeQuery,
    response: data?.communityAIQuery,
    loading,
    error
  };
};