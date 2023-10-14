import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface BoardProps {
    squares: string[];
    onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
    // useSubscription(GAME_UPDATED, (

    // ));

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

export default Board;