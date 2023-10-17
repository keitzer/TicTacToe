/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateNewGame($playerId: ID!) {\n    createGame(playerId: $playerId) {\n        id\n        board\n        currentPlayer\n        winner\n        draw\n        players {\n          id\n          name\n        }\n      }\n  }  \n": types.CreateNewGameDocument,
    "\n  query GetListOfGames {\n    games {\n      id\n      players {\n        id\n        name\n      }\n    }\n  }  \n": types.GetListOfGamesDocument,
    "\n  query GetGameWithID($gameId: ID!) {\n    game(id: $gameId) {\n      id\n      players {\n        id\n        name\n      }\n      board\n      currentPlayer\n      winner\n      draw\n    }\n  }\n": types.GetGameWithIdDocument,
    "\n  fragment GetGameFragment on Game {\n      id\n      board\n  }\n": types.GetGameFragmentFragmentDoc,
    "\n  subscription gameUpdated($gameId: ID!) {\n    gameUpdated(gameId: $gameId) {\n      id\n      players {\n        id\n        name\n      }\n      board\n      currentPlayer\n      winner\n      draw\n    }\n  }\n": types.GameUpdatedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateNewGame($playerId: ID!) {\n    createGame(playerId: $playerId) {\n        id\n        board\n        currentPlayer\n        winner\n        draw\n        players {\n          id\n          name\n        }\n      }\n  }  \n"): (typeof documents)["\n  mutation CreateNewGame($playerId: ID!) {\n    createGame(playerId: $playerId) {\n        id\n        board\n        currentPlayer\n        winner\n        draw\n        players {\n          id\n          name\n        }\n      }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetListOfGames {\n    games {\n      id\n      players {\n        id\n        name\n      }\n    }\n  }  \n"): (typeof documents)["\n  query GetListOfGames {\n    games {\n      id\n      players {\n        id\n        name\n      }\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGameWithID($gameId: ID!) {\n    game(id: $gameId) {\n      id\n      players {\n        id\n        name\n      }\n      board\n      currentPlayer\n      winner\n      draw\n    }\n  }\n"): (typeof documents)["\n  query GetGameWithID($gameId: ID!) {\n    game(id: $gameId) {\n      id\n      players {\n        id\n        name\n      }\n      board\n      currentPlayer\n      winner\n      draw\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment GetGameFragment on Game {\n      id\n      board\n  }\n"): (typeof documents)["\n  fragment GetGameFragment on Game {\n      id\n      board\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription gameUpdated($gameId: ID!) {\n    gameUpdated(gameId: $gameId) {\n      id\n      players {\n        id\n        name\n      }\n      board\n      currentPlayer\n      winner\n      draw\n    }\n  }\n"): (typeof documents)["\n  subscription gameUpdated($gameId: ID!) {\n    gameUpdated(gameId: $gameId) {\n      id\n      players {\n        id\n        name\n      }\n      board\n      currentPlayer\n      winner\n      draw\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;