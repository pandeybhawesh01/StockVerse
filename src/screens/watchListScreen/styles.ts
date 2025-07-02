import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  row: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16 },
  newRow: { flexDirection: 'row', marginTop: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 },
  addBtn: { marginLeft: 8, backgroundColor: '#007AFF', padding: 12, borderRadius: 4 },
  addText: { color: '#fff' },
});