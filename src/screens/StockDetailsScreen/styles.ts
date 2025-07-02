import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  screenTitle: { fontSize: 18, fontWeight: '600', marginLeft: 12 },
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', marginTop: 40, textAlign: 'center' },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  stockName: { fontSize: 20, fontWeight: '700' },
  metaText: { fontSize: 12, color: '#666' },

  bookmarkBtn: { backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  bookmarkText: { color: '#fff', fontWeight: '600', fontSize: 12 },

  chart: { borderRadius: 8, marginBottom: 16 },

  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  cardTitle: { fontSize: 14, fontWeight: '600', marginBottom: 8 },

  description: { fontSize: 12, color: '#333', lineHeight: 18, marginBottom: 8 },
  readMore: { color: '#007AFF', fontSize: 12 },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: { backgroundColor: '#f0e6ff', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, marginRight: 8, marginBottom: 8 },
  tagText: { fontSize: 10, color: '#6a1b9a' },

  subLabel: { fontSize: 12, color: '#444', marginBottom: 4 },
  rowLabels: { flexDirection: 'row', justifyContent: 'space-between' },

  rangeValue: { fontSize: 12, fontWeight: '600' },
  barTrack: { height: 6, backgroundColor: '#eee', borderRadius: 3, position: 'relative', marginVertical: 4 },
  marker: {
    position: 'absolute',
    top: -4,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#444',
  },

  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metricBlock: { width: '48%' },
  metricLabel: { fontSize: 12, color: '#666' },
  metricValue: { fontSize: 14, fontWeight: '600', marginTop: 4 },
});
