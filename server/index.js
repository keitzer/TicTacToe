const { ApolloServer, gql } = require('apollo-server');

const games = {}; // In-memory storage for game data
const subscribers = {}; // Subscribers for game updates

// Define your GraphQL schema
const typeDefs = gql`
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

// Define your resolvers
const resolvers = {
    Query: {
        games: () => Object.values(games),
        game: (parent, args) => games[args.id],
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

            const player = { id: playerId, username: `Player 2` };
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
            subscribe: (parent, { gameId }) => {
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

// Create an instance of Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
    console.log(`Server is running at ${url}`);
});
