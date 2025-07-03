import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useWatchlists } from '../../viewModels/useWatchLists';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addStockToLists } from '../../services/watchListServices';
import { Props } from './types';
import { PlusCircleIcon } from 'react-native-heroicons/outline';
import colors from '../../constants/colors';
export type WatchlistModalRef = {
  open: () => void;
  close: () => void;
};

export default forwardRef<WatchlistModalRef, Props>(function WatchlistModal(
  { stock, onAdded },
  ref
) {
  const { listsQ, createListM } = useWatchlists();
  const qc = useQueryClient();
  const modalRef = useRef<Modalize>(null);
  const [newName, setNewName] = useState('');

  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.open(),
    close: () => modalRef.current?.close(),
  }));

  const addM = useMutation<void, Error, string>({
    mutationFn: (listId) => addStockToLists(stock, [listId]),
    onSuccess: (_, listId) => {
      qc.invalidateQueries({ queryKey: ['watchlistItems', listId] });
      onAdded?.();
      modalRef.current?.close();
    },
  });

  return (
    <Modalize
      ref={modalRef}
      withHandle
      handleStyle={styles.handle}
      modalStyle={styles.modal}
      adjustToContentHeight={false}
      keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      avoidKeyboardLikeIOS
      modalHeight={450}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={{flex:1, justifyContent: 'space-evenly'}}>
        <Text style={styles.title}>Add {stock.ticker} to:</Text>
        
        <View style={styles.listContainer}>
          {listsQ.isLoading && <ActivityIndicator />}
          {listsQ.data?.map((wl) => (
            <TouchableOpacity
              key={wl.id}
              style={styles.row}
              onPress={() => addM.mutate(wl.id)}
            >
              <Text style={styles.rowText}>{wl.name}</Text>
              {addM.isLoading && addM.variables === wl.id && (
                <ActivityIndicator size="small" />
              )}
            </TouchableOpacity>
          ))}
          {listsQ.data && listsQ.data.length === 0 && (
            <Text style={styles.empty}>No watchlists yet.</Text>
          )}
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="New watchlist name"
            placeholderTextColor={colors.gray}
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
            <PlusCircleIcon size={28} color={colors.bluePrimary} />
          </TouchableOpacity>
        </View>
        </View>
      </KeyboardAvoidingView>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  flex: { flex: 1, padding: 16 },
  handle: {
    width: 60,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 8,
  },
  modal: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    // allow scroll if content exceeds height
  },
  row: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowText: { fontSize: 16 },
  empty: { textAlign: 'center', color: colors.gray, marginTop: 20 },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 12,
    marginTop: 12,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: colors.black,
  },
  addBtn: {
    marginLeft: 12,
  },
});

// import React, { forwardRef, useImperativeHandle, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   TextInput,
// } from 'react-native';
// import { Modalize } from 'react-native-modalize';
// import { useWatchlists } from '../../viewModels/useWatchLists';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { addStockToLists } from '../../services/watchListServices';
// import { Stock } from '../../screens/exploreScreen/types';
// import { styles } from './styles';
// import { Props } from './types';
// import { PlusCircleIcon } from 'react-native-heroicons/outline';
// import colors from '../../constants/colors';

// export type WatchlistModalRef = {
//   open: () => void;
//   close: () => void;
// };


// const WatchlistModal = forwardRef<WatchlistModalRef, Props>(
//   ({ stock, onAdded }, ref) => {
//     // const { listsQ } = useWatchlists();
//       const [newName, setNewName] = useState('');
//         const { listsQ, createListM } = useWatchlists();
      
    
//     const qc = useQueryClient();

//     // mutation to add this ticker to a single list
//     const addM = useMutation<void, Error, string>({
//       mutationFn: (listId) => addStockToLists(stock, [listId]),
//       onSuccess: (_, listId) => {
//         // refresh items in that list
//         qc.invalidateQueries({ queryKey: ['watchlistItems', listId] });
//         // optionally let parent know
//         onAdded?.();
//         // then close
//         modalizeRef.current?.close();
//       },
//     });

//     // expose open/close to parent
//     const modalizeRef = React.useRef<Modalize>(null);
//     useImperativeHandle(ref, () => ({
//       open: () => modalizeRef.current?.open(),
//       close: () => modalizeRef.current?.close(),
//     }));

//     return (
//       <Modalize
//         ref={modalizeRef}
//         modalHeight={400}
//         handleStyle={styles.handle}
//         modalStyle={styles.modal}
//         adjustToContentHeight={false}
//       >
//         <KeyboardAvoidingView
//         behavior={Platform.select({ ios: 'padding', android: undefined })}
//       >
//         <View style={styles.container}>
//           <Text style={styles.title}>Add {stock.ticker} to:</Text>

//           {listsQ.isLoading && <ActivityIndicator />}

//           {listsQ.data?.map((wl) => (
//             <TouchableOpacity
//               key={wl.id}
//               style={styles.row}
//               onPress={() => addM.mutate(wl.id)}
//             >
//               <Text style={styles.rowText}>{wl.name}</Text>
//               {addM.isLoading && addM.variables === wl.id && (
//                 <ActivityIndicator size="small" />
//               )}
//             </TouchableOpacity>
//           ))}

//           {listsQ.data?.length === 0 && (
//             <Text style={styles.empty}>No watchlists yet.</Text>
//           )}
//         </View>
        
//         <View style={styles.newRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="New watchlist name"
//             placeholderTextColor={colors.black}
//             value={newName}
//             onChangeText={setNewName}
//           />
//           <TouchableOpacity
//             style={styles.addBtn}
//             onPress={() => {
//               if (newName.trim()) {
//                 createListM.mutate(newName.trim());
//                 setNewName('');
//               }
//             }}
//           >
//             {/* <Text> + </Text> */}
//             <PlusCircleIcon size={32} color="#007AFF" />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//       </Modalize>
//     );
//   }
// );

// export default WatchlistModal;

