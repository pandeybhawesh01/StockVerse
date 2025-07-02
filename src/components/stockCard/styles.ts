import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: 150,
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
