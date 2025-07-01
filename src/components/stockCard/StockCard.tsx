import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stock, StockStackParamList } from './types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ProductNavProp = StackNavigationProp<StockStackParamList, 'Product'>;

type Props = {
  stock: Stock;
};

export default function StockCard({ stock }: Props) {
  const navigation = useNavigation<ProductNavProp>();
  const isPositive = parseFloat(stock.change_amount) >= 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Product', { ticker: stock.ticker })}
    >
      <Text style={styles.ticker}>{stock.ticker}</Text>
      <Text style={styles.price}>${stock.price}</Text>
      <Text style={[styles.change, isPositive ? styles.plus : styles.minus]}>
        {stock.change_amount} ({stock.change_percentage})
      </Text>
      <Text style={styles.volume}>Vol: {stock.volume}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 4
  },
  ticker: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, marginVertical: 4 },
  change: { fontSize: 12 },
  plus: { color: '#4CAF50' },
  minus: { color: '#E53935' },
  volume: { fontSize: 10, color: '#666', marginTop: 4 },
});
