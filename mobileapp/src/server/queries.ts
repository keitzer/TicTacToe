import { gql } from '@apollo/client';

export const GAME_LIST = gql`
  query GetListOfGames {
    games {
      id
      players {
        id
        name
      }
    }
  }  
`;
