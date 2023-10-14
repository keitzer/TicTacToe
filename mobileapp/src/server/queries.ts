import { gql } from '@apollo/client';

export const GAME_LIST = gql`
  query GameList {
    games {
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
`;
