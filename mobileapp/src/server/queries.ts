import { gql } from '@/__generated__/gql';

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
