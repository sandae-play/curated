import React, {useEffect} from 'react';
import Preference from 'react-native-preference';
import {v4 as uuidv4} from 'uuid';
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient,} from 'react-query';

import {getCount, patchCount} from './api';

const styles = StyleSheet.create({
    jumbo: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: 'aliceblue'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
    },
    buttonLabel: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",
        color: "coral",
    },
})

const App = () => {
    Preference.setWhiteList([]); // bug: https://github.com/shimohq/react-native-preference/issues/23

    useEffect(() => {
        const setPreference = async () => {
            if (Preference.get('userId') == null) {
                await Preference.set('userId', uuidv4());
            }
        }

        setPreference();
    }, []);

    return (
        <QueryClientProvider client={new QueryClient()}>
            <Counter/>
        </QueryClientProvider>
    );
};

const CounterText: React.FC<{ userId: string }> = ({userId}) => {
    const query = useQuery('count', () => getCount(userId));

    if (query.isLoading) {
        return <Text style={styles.jumbo}>Count: ...</Text>
    }

    if (query.isError) {
        const error = query.error as Error;
        return <Text>{error.message}</Text>
    }

    return <Text style={styles.jumbo}>Count: {query.data.count}</Text>
}

function Counter() {
    const queryClient = useQueryClient();
    const userId = Preference.get('userId');

    const increment = useMutation(patchCount, {
        onSuccess: () => {
            queryClient.invalidateQueries('count');
        },
    })

    return (
                <View style={styles.container}>
                    <CounterText userId={userId}/>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => {
                                              increment.mutate({userId, count: 1});
                                          }}>
                            <Text style={styles.buttonLabel}>Increment (+)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => {
                                              increment.mutate({userId, count: -1});
                                          }}>
                            <Text style={styles.buttonLabel}>Decrement (-)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    );
}

export default App;
