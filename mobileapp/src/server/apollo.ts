import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
    uri: 'http://10.0.0.98:4000', // Replace with your GraphQL HTTP server URL
});

// const wsLink = new WebSocketLink({
//     uri: 'ws://localhost:4000/graphql', // Replace with your GraphQL WebSocket server URL
//     options: {
//         reconnect: true,
//     },
// });

// const link = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//     },
//     wsLink,
//     httpLink
// );

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
