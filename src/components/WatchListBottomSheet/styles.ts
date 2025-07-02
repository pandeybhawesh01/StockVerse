import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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