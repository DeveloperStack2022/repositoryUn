import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client';

import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  const content = useRoutes(router);
  const client = new ApolloClient({
    uri: 'http://192.168.0.5:8000/graphql',
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CssBaseline />
        {content}
      </ThemeProvider>
    </ApolloProvider>
  );
}
export default App;
