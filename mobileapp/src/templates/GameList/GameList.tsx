import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import client from '@/server/apollo';
import { GAME_LIST } from '@/server/queries';
import { useNavigation } from '@react-navigation/native';
import GameListItem from '@/components/GameListItem';
import { Game } from '@/__generated__/graphql';

const GameList: React.FC = () => {
    const navigation = useNavigation();
    // const [games, setGames] = useState<GameData[]>([]);
    const { loading, error, data, refetch } = useQuery(GAME_LIST, { client });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Refresh" onPress={() => { refetch() }} />
            ),
        });
    }, [navigation]);

    return (
        <View>
            <Text>Data from GraphQL Server:</Text>
            <FlatList
                data={data?.games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <GameListItem game={item as Game} onClick={() => { }} />
                )}
            />
        </View>
    );
};

export default GameList;