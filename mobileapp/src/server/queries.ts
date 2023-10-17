import { gql } from '@/__generated__/gql';
import { gql as apolloGQL } from '@apollo/client';

export const GAME_LIST = gql(`
  query GetListOfGames {
    games {
      id
      players {
        id
        name
      }
    }
  }  
`);

export const GET_GAME = gql(`
  query GetGameWithID($gameId: ID!) {
    game(id: $gameId) {
      id
      players {
        id
        name
      }
      board
      currentPlayer
      winner
      draw
    }
  }
`);

export const GET_GAME_FRAGMENT = apolloGQL`
  fragment GetGameFragment on Game {
      id
      board
  }
`;