import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useWatchlists } from '../../viewModels/useWatchLists';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StockStackParamList } from '../../navigation/types';

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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  row: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16 },
  newRow: { flexDirection: 'row', marginTop: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 },
  addBtn: { marginLeft: 8, backgroundColor: '#007AFF', padding: 12, borderRadius: 4 },
  addText: { color: '#fff' },
});
