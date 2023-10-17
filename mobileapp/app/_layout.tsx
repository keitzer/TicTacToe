import { Stack } from 'expo-router';
import { GlobalStateProvider } from '@/state/GlobalState';
import client from '@/server/apollo';
import { ApolloProvider } from '@apollo/client';


export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <GlobalStateProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </GlobalStateProvider>
    </ApolloProvider>
  );
}
