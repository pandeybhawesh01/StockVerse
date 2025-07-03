// src/screens/WatchlistsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRightIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { useWatchlists } from '../../viewModels/useWatchLists';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StockStackParamList } from '../../navigation/types';
import { styles } from './styles';
import ArrowLeftIcon from 'react-native-heroicons/outline/ArrowLeftIcon';
import colors from '../../constants/colors';

type NavProp = StackNavigationProp<StockStackParamList, 'Watchlist'>;

export default function WatchlistsScreen() {
  const navigation = useNavigation<NavProp>();
  const { listsQ, createListM } = useWatchlists();
  const [newName, setNewName] = useState('');

  if (listsQ.isLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading your watchlists…</Text>
      </SafeAreaView>
    );
  }
    if (listsQ.data && listsQ.data.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.emptyTitle}>You haven't created any watchlists yet.</Text>
        <Text style={styles.emptySubtitle}>Add a WatchList from bellow to get started.</Text>
      </SafeAreaView>
    );
  }
  console.log('data is ',listsQ.data);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color= {colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Watchlists</Text>
      </View>
      <FlatList
        data={listsQ.data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('WatchlistDetail', {
                listId: item.id,
                name: item.name,
              })
            }
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <ChevronRightIcon size={20} color={colors.gray} />
            {/* <Text style={styles.cardSubtitle}>
              {item?.length ?? '0'} stocks
            </Text> */}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <KeyboardAvoidingView
        // behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={styles.newRow}>
          <TextInput
            style={styles.input}
            placeholder="New watchlist name"
            placeholderTextColor={"black"}
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
            <PlusCircleIcon size={32} color={colors.bluePrimary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
// import { useWatchlists } from '../../viewModels/useWatchLists';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { StockStackParamList } from '../../navigation/types';
// import { styles } from './styles';

// type NavProp = StackNavigationProp<StockStackParamList, 'Watchlist'>;

// export default function WatchlistsScreen() {
//   const navigation = useNavigation<NavProp>();
//   const { listsQ, createListM } = useWatchlists();
//   const [newName, setNewName] = useState('');

//   if (listsQ.isLoading) return <Text>Loading...</Text>;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={listsQ.data}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.row}
//             onPress={() => navigation.navigate('WatchlistDetail', { listId: item.id, name: item.name })}
//           >
//             <Text style={styles.name}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <View style={styles.newRow}>
//         <TextInput
//           style={styles.input}
//           placeholder="New watchlist name"
//           value={newName}
//           onChangeText={setNewName}
//         />
//         <TouchableOpacity
//           style={styles.addBtn}
//           onPress={() => {
//             if (newName.trim()) {
//               createListM.mutate(newName.trim());
//               setNewName('');
//             }
//           }}
//         >
//           <Text style={styles.addText}>Add</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

