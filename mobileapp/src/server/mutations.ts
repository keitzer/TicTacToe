import { gql } from '@/__generated__/gql';

export const CREATE_GAME = gql(`
  mutation CreateNewGame($playerId: ID!) {
    createGame(playerId: $playerId) {
        id
        board
        currentPlayer
        winner
        draw
        players {
          id
          name
        }
      }
  }  
`);
