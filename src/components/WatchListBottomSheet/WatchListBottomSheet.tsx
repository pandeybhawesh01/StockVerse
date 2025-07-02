// src/components/WatchlistModal.tsx
import React, { forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useWatchlists } from '../../viewModels/useWatchLists';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addStockToLists } from '../../services/watchListServices';
import { Stock } from '../../screens/exploreScreen/types';
import { styles } from './styles';
import { Props } from './types';

export type WatchlistModalRef = {
  open: () => void;
  close: () => void;
};


const WatchlistModal = forwardRef<WatchlistModalRef, Props>(
  ({ stock, onAdded }, ref) => {
    const { listsQ } = useWatchlists();
    const qc = useQueryClient();

    // mutation to add this ticker to a single list
    const addM = useMutation<void, Error, string>({
      mutationFn: (listId) => addStockToLists(stock, [listId]),
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
          <Text style={styles.title}>Add {stock.ticker} to:</Text>

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

