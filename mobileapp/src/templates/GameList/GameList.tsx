import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import client from '@/server/apollo';
import { GAME_LIST } from '@/server/queries';
import GameListItem from '@/components/GameListItem';
import { Game } from '@/__generated__/graphql';
import { Stack, useRouter } from 'expo-router';


const GameList: React.FC = () => {
    const router = useRouter();
    const { loading, error, data, refetch } = useQuery(GAME_LIST, { client });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View>
            <Stack.Screen
                options={{
                    title: "List of Active Games",
                    headerRight: () => <Button title="Refresh" onPress={() => { refetch() }} />,
                }}
            />
            <FlatList
                data={data?.games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <GameListItem game={item as Game} onClick={() => { router.push({ pathname: "game" }) }} />
                )}
            />
        </View>
    );
};

export default GameList;