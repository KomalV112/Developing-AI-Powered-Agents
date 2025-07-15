// frontend/src/App.jsx
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import CommunityPage from './pages/CommunityPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container-fluid p-0">
        <main className="main-content">
          <CommunityPage />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
