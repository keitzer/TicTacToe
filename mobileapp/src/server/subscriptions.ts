import { gql } from '@apollo/client';

export const GAME_UPDATED = gql`
  subscription gameUpdated($gameId: ID!) {
    gameUpdated(gameId: $gameId) {
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
`;
