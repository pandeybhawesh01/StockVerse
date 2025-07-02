import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorText: { fontSize: 16, color: '#E53935', marginBottom: 8 },
  retryText: { color: '#007AFF', fontSize: 14 },
  section: { marginTop: 16, paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: '600', color: '#000' },
  viewAll: { fontSize: 14, color: '#007AFF' },
  row: {
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  searchBar: {
    height: 48,
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  searchPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
});
