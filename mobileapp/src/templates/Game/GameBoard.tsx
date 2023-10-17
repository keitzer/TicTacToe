import React, { useState } from 'react';
import { View, Text } from 'react-native';
// import { useQuery, useSubscription } from '@apollo/client';
import client from '@/server/apollo';
// import { GAME_UPDATED } from '@/server/subscriptions';
import Board from '@/components/Board';
import { GET_GAME_FRAGMENT } from '@/server/queries';
import { useGlobalState } from '@/state/GlobalState';
import { Game } from '@/__generated__/graphql';

const GameBoard: React.FC = () => {
  const { state } = useGlobalState();
  const gameId = "Game:" + state.currentGame;
  console.log(gameId);
  // const game = client.readQuery({ query: GET_GAME, variables: { gameId: "Game:" + state.currentGame } });
  const game = client.readFragment<Game>({
    id: gameId,
    fragment: GET_GAME_FRAGMENT,
  });

  console.log(game);
  if (game === undefined || game === null) {
    return (<Text>Whoops! Game cannot be found. Please try again.</Text>);
  }

  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const calculateWinner = (squares: string[]) => {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i] as [number, number, number];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = (i: number) => {
    const squares = [...board];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setBoard(squares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  let status: string;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="m-8">{status}</Text>
      <Board squares={board} onClick={handleClick} />
    </View>
  );
};

export default GameBoard;
