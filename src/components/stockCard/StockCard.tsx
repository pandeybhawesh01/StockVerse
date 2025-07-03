import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Stock, StockStackParamList } from './types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './styles';

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
