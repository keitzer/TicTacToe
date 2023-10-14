import React from 'react';
import { View, Button } from 'react-native';
import { Game } from '@/__generated__/graphql';

interface GameListItemProps {
    game: Game;
    onClick: () => void;
}

const GameListItem: React.FC<GameListItemProps> = ({ game, onClick }) => {
    return (
        <View>
            <Button title={game.id} onPress={() => onClick()} />
        </View>
    );
};

export default GameListItem;