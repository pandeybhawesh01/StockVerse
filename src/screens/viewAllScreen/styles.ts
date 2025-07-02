import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  errorText: {
    fontSize: 16,
    color: '#E53935',
    marginBottom: 8
  },
  retryText: {
    fontSize: 14,
    color: '#007AFF'
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000'
  },
  list: {
    paddingBottom: 16
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 12
  },
});