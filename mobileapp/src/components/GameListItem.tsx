import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Game } from '@/__generated__/graphql';

interface GameListItemProps {
    game: Game;
    onClick: (i: number) => void;
}

const GameListItem: React.FC<GameListItemProps> = ({ game, onClick }) => {
    return (
        <View>
            <Text>{game.id}</Text>
        </View>
    );
};

export default GameListItem;