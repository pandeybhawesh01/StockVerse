// src/components/WatchlistModal.tsx
import React, { forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useWatchlists } from '../../viewModels/useWatchLists';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { addStockToLists } from '../../services/watchlistStorage';
import { addStockToLists } from '../../services/watchListServices';

export type WatchlistModalRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  ticker: string;
  onAdded?: () => void;
};

const WatchlistModal = forwardRef<WatchlistModalRef, Props>(
  ({ ticker, onAdded }, ref) => {
    const { listsQ } = useWatchlists();
    const qc = useQueryClient();

    // mutation to add this ticker to a single list
    const addM = useMutation<void, Error, string>({
      mutationFn: (listId) => addStockToLists(ticker, [listId]),
      onSuccess: (_, listId) => {
        // refresh items in that list
        qc.invalidateQueries({ queryKey: ['watchlistItems', listId] });
        // optionally let parent know
        onAdded?.();
        // then close
        modalizeRef.current?.close();
      },
    });

    // expose open/close to parent
    const modalizeRef = React.useRef<Modalize>(null);
    useImperativeHandle(ref, () => ({
      open: () => modalizeRef.current?.open(),
      close: () => modalizeRef.current?.close(),
    }));

    return (
      <Modalize
        ref={modalizeRef}
        modalHeight={400}
        handleStyle={styles.handle}
        modalStyle={styles.modal}
        adjustToContentHeight={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Add {ticker} to:</Text>

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

          {listsQ.data?.length === 0 && (
            <Text style={styles.empty}>No watchlists yet.</Text>
          )}
        </View>
      </Modalize>
    );
  }
);

export default WatchlistModal;

const styles = StyleSheet.create({
  handle: {
    backgroundColor: '#ccc',
    width: 60,
    alignSelf: 'center',
    marginBottom: 8,
  },
  modal: {
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  container: { paddingBottom: 16 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  row: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  rowText: { fontSize: 16 },
  empty: { textAlign: 'center', color: '#666', marginTop: 32 },
});

// import React, { useMemo, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import { useWatchlists } from '../../viewModels/useWatchLists';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { addStockToLists } from '../../services/watchListServices';

// type Props = {
//   visible: boolean;
//   onClose: () => void;
//   ticker: string;
// };
// export default function WatchlistSheet({ visible, onClose, ticker }: Props) {
//   const { listsQ } = useWatchlists();
//   const qc = useQueryClient();
//   const sheetRef = useRef<BottomSheetModal>(null);
//   const snapPoints = useMemo(() => ['50%'], []);

//   // Imperatively present/dismiss
//   useEffect(() => {
//     if (visible) {
//       sheetRef.current?.present();
//     } else {
//       sheetRef.current?.close();
//     }
//   }, [visible]);

//   const addM = useMutation<void, Error, string[]>({
//     mutationFn: (listIds) => addStockToLists(ticker, listIds),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ['watchlistItems'] });
//       onClose();
//     },
//   });

//   return (
//     <BottomSheetModal
//       ref={sheetRef}
//       index={0}
//       snapPoints={snapPoints}
//       onDismiss={onClose}
//     >
//       <View style={styles.content}>
//         <Text style={styles.header}>Add {ticker} to:</Text>
//         {listsQ.data?.map((wl) => (
//           <TouchableOpacity
//             key={wl.id}
//             style={styles.row}
//             onPress={() => addM.mutate([wl.id])}
//           >
//             <Text style={styles.name}>{wl.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </BottomSheetModal>
//   );
// }


// const styles = StyleSheet.create({
//     content: { flex: 1, padding: 16 },
//     header: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
//     row: { paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
//     name: { fontSize: 16 },
// });
