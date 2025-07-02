import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useWatchlists } from '../../viewModels/useWatchLists';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StockStackParamList } from '../../navigation/types';
import { styles } from './styles';

type NavProp = StackNavigationProp<StockStackParamList, 'Watchlist'>;

export default function WatchlistsScreen() {
  const navigation = useNavigation<NavProp>();
  const { listsQ, createListM } = useWatchlists();
  const [newName, setNewName] = useState('');

  if (listsQ.isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={listsQ.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('WatchlistDetail', { listId: item.id, name: item.name })}
          >
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.newRow}>
        <TextInput
          style={styles.input}
          placeholder="New watchlist name"
          value={newName}
          onChangeText={setNewName}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            if (newName.trim()) {
              createListM.mutate(newName.trim());
              setNewName('');
            }
          }}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

