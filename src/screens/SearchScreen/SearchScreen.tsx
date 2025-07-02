
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StockStackParamList } from '../../navigation/types';
import axios from 'axios';
import { styles } from './styles';

type SearchNavProp = StackNavigationProp<StockStackParamList, 'Product'>;

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<SearchNavProp>();

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const res = await axios.get(
                    `https://www.alphavantage.co/query`,
                    {
                        params: {
                            function: 'SYMBOL_SEARCH',
                            keywords: query,
                            apikey: '5C2NHMMO04LNEUSH',
                        },
                        timeout: 10000,
                    }
                );
                console.log('axios response', res.data);
                setResults(res.data.bestMatches || []);
            } catch (e) {
                console.log("error is", e)
                console.error(e);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);
    console.log("results ", results)

    const renderItem = ({ item }: { item: any }) => {
        const symbol = item['1. symbol'];
        const name = item['2. name'];
        const type = item['3. type'];
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('Product', { ticker: symbol })}
            >
                <Text style={styles.symbol}>{symbol}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.type}>{type}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for Stocks, ETFs & more"
                value={query}
                onChangeText={setQuery}
                autoFocus
            />

            {loading ? (
                <ActivityIndicator style={styles.loader} />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item, i) => item['1. symbol'] + i}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}



