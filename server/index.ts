import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

const games = {}; // In-memory storage for game data
const subscribers = {}; // Subscribers for game updates

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Player {
    id: ID!
    name: String!
  }
  
  type Game {
    id: ID!
    players: [Player!]!
    board: [String!]!
    currentPlayer: ID!
    winner: ID
    draw: Boolean
  }
  
  type Move {
    gameId: ID!
    player: Player!
    position: Int!
    symbol: String!
  }
  
  type Query {
    games: [Game!]!
    game(id: ID!): Game
  }
  
  type Mutation {
    createGame(playerId: ID!): Game
    joinGame(gameId: ID!, playerId: ID!): Game
    makeMove(gameId: ID!, playerId: ID!, position: Int!): Move
  }
  
  type Subscription {
    gameUpdated(gameId: ID!): Game
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        games: () => Object.values(games),
        game: (_, args) => games[args.id],
    },

    Mutation: {
        createGame: (_, { playerId }) => {
            const player = { id: playerId, name: `Player 1` };

            const gameId = Math.random().toString(36).substr(2, 9); // Generate a random game ID

            const game = {
                id: gameId,
                players: [player],
                board: Array(9).fill(''), // Initialize an empty game board.
                currentPlayer: 0,
                winner: -1,
                draw: false,
            };

            games[gameId] = game;

            return game;
        },

        joinGame: (_, { gameId, playerId }) => {
            const game = games[gameId];

            if (!game) {
                throw new Error('Game not found');
            }

            if (game.players.length >= 2) {
                throw new Error('Game is already full');
            }

            const player = { id: playerId, name: `Player 2` };
            game.players.push(player);

            return game;
        },

        makeMove: (_, { gameId, playerId, position }) => {
            const game = games[gameId];
            if (!game || game.winner || game.draw) {
                throw new Error('Game is not active');
            }

            if (playerId !== game.currentPlayer) {
                throw new Error('Not your turn');
            }

            if (game.board[position] !== '') {
                throw new Error('Invalid move');
            }

            const symbol = game.currentPlayer === '1' ? 'X' : 'O';

            game.board[position] = symbol;
            game.currentPlayer = game.currentPlayer === '1' ? '2' : '1';

            const move = { gameId, player: { id: playerId }, position, symbol };
            return move;
        },
    },

    Subscription: {
        gameUpdated: {
            subscribe: (_, { gameId }) => {
                if (!subscribers[gameId]) {
                    subscribers[gameId] = [];
                }
                const channel = Math.random().toString(36).substr(2, 9); // Create a unique channel for each subscription
                subscribers[gameId].push(channel);
                return withFilter(
                    () => pubsub.asyncIterator(channel),
                    (payload, variables) => {
                        return payload.gameUpdated.id === variables.gameId;
                    }
                );
            },
        },
    },
};

interface MyContext {
    token?: string;
}

// Required logic for integrating with Express
const app = express();

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<MyContext>({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

const PORT = 4000;
// Modified server startup
await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/`);
