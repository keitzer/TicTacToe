/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Game = {
  __typename?: 'Game';
  board: Array<Scalars['String']['output']>;
  currentPlayer: Scalars['ID']['output'];
  draw?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  players: Array<Player>;
  winner?: Maybe<Scalars['ID']['output']>;
};

export type Move = {
  __typename?: 'Move';
  gameId: Scalars['ID']['output'];
  player: Player;
  position: Scalars['Int']['output'];
  symbol: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame?: Maybe<Game>;
  joinGame?: Maybe<Game>;
  makeMove?: Maybe<Move>;
};


export type MutationCreateGameArgs = {
  playerId: Scalars['ID']['input'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['ID']['input'];
  playerId: Scalars['ID']['input'];
};


export type MutationMakeMoveArgs = {
  gameId: Scalars['ID']['input'];
  playerId: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
  games: Array<Game>;
};


export type QueryGameArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  gameUpdated?: Maybe<Game>;
};


export type SubscriptionGameUpdatedArgs = {
  gameId: Scalars['ID']['input'];
};

export type CreateNewGameMutationVariables = Exact<{
  playerId: Scalars['ID']['input'];
}>;


export type CreateNewGameMutation = { __typename?: 'Mutation', createGame?: { __typename?: 'Game', id: string, board: Array<string>, currentPlayer: string, winner?: string | null, draw?: boolean | null, players: Array<{ __typename?: 'Player', id: string, name: string }> } | null };

export type GetListOfGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfGamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', id: string, players: Array<{ __typename?: 'Player', id: string, name: string }> }> };

export type GetGameWithIdQueryVariables = Exact<{
  gameId: Scalars['ID']['input'];
}>;


export type GetGameWithIdQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, board: Array<string>, currentPlayer: string, winner?: string | null, draw?: boolean | null, players: Array<{ __typename?: 'Player', id: string, name: string }> } | null };

export type GetGameFragmentFragment = { __typename?: 'Game', id: string, board: Array<string> } & { ' $fragmentName'?: 'GetGameFragmentFragment' };

export type GameUpdatedSubscriptionVariables = Exact<{
  gameId: Scalars['ID']['input'];
}>;


export type GameUpdatedSubscription = { __typename?: 'Subscription', gameUpdated?: { __typename?: 'Game', id: string, board: Array<string>, currentPlayer: string, winner?: string | null, draw?: boolean | null, players: Array<{ __typename?: 'Player', id: string, name: string }> } | null };

export const GetGameFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetGameFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Game"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"board"}}]}}]} as unknown as DocumentNode<GetGameFragmentFragment, unknown>;
export const CreateNewGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"board"}},{"kind":"Field","name":{"kind":"Name","value":"currentPlayer"}},{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"draw"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateNewGameMutation, CreateNewGameMutationVariables>;
export const GetListOfGamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListOfGames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetListOfGamesQuery, GetListOfGamesQueryVariables>;
export const GetGameWithIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGameWithID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"board"}},{"kind":"Field","name":{"kind":"Name","value":"currentPlayer"}},{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"draw"}}]}}]}}]} as unknown as DocumentNode<GetGameWithIdQuery, GetGameWithIdQueryVariables>;
export const GameUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"gameUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"board"}},{"kind":"Field","name":{"kind":"Name","value":"currentPlayer"}},{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"draw"}}]}}]}}]} as unknown as DocumentNode<GameUpdatedSubscription, GameUpdatedSubscriptionVariables>;