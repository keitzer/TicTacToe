import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import client from '@/server/apollo';
import { GAME_LIST } from '@/server/queries';

const GameList: React.FC = () => {
    const { loading, error, data } = useQuery(GAME_LIST, { client });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View>
            <Text>Data from GraphQL Server:</Text>
            <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
    );
};

export default GameList;