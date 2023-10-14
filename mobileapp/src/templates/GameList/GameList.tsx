import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useQuery } from '@apollo/client';
import client from '@/server/apollo';
import { GAME_LIST } from '@/server/queries';
import { useNavigation } from '@react-navigation/native';

const GameList: React.FC = () => {
    // const [games, setGames] = useState<GameData[]>([]);
    const { loading, error, data, refetch } = useQuery(GAME_LIST, { client });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Refresh" onPress={() => { refetch() }} />
            ),
        });
    }, [navigation]);

    return (
        <View>
            <Text>Data fFrom GraphQL Server:</Text>
            <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
    );
};

export default GameList;