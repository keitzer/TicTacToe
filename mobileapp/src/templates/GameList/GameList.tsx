import React, { useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import client from '@/server/apollo';
import { GAME_LIST } from '@/server/queries';
import { CREATE_GAME } from '@/server/mutations';
import GameListItem from '@/components/GameListItem';
import { Game } from '@/__generated__/graphql';
import { Stack, useRouter } from 'expo-router';
import { useGlobalState } from '@/state/GlobalState';

const GameList: React.FC = () => {
    const router = useRouter();
    const { dispatch } = useGlobalState();
    const [createGame, { loading: createLoading }] = useMutation(CREATE_GAME, { client });
    const { loading: listLoading, error: listError, data: listData, refetch: refetchList } = useQuery(GAME_LIST, { client });

    if (listLoading || createLoading) return <Text>Loading...</Text>;
    if (listError) return <Text>Error: {listError.message}</Text>;

    const createNewGame = () => {
        let newGameId = "";
        createGame({
            variables: {
                playerId: "1",
            },
        })
            .then((response) => {
                newGameId = response.data?.createGame?.id ?? "";
                return refetchList();
            })
            .then((_) => pushToGameWithId(newGameId));
    }

    const pushToGameWithId = (id: string) => {
        dispatch({ type: 'SET_CURRENT_GAME', id: id });
        router.push({ pathname: "game" });
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: "List of Active Games",
                    headerLeft: () => <Button title="Refresh" onPress={() => { refetchList() }} />,
                    headerRight: () => <Button title="Create" onPress={() => { createNewGame() }} />,
                }}
            />
            <FlatList
                data={listData?.games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <GameListItem game={item as Game} onClick={() => pushToGameWithId(item.id)} />
                )}
            />
        </>
    );
};

export default GameList;