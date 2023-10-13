import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  const renderSquare = (i: number) => {
    return (
      <View className='bg-blue-200 flex-1'>
        <TouchableOpacity className="bg-rose-100 grow items-center justify-center" onPress={() => onClick(i)}>
          <Text>{squares[i] ?? ""}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 flex-row">
      <View className="flex-1 bg-gray-300 divide-y">
        <View className="flex-1 flex-row grow divide-x">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View className="flex-1 flex-row divide-x">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View className="flex-1 flex-row divide-x">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
    </View>
  );
};

const Welcome: React.FC = () => {
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

export { Welcome };
