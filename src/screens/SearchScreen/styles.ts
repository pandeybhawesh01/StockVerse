import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    searchInput: {
        height: 48,
        margin: 16,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        fontSize: 16,
        color: 'black',
    },
    loader: { marginTop: 20 },
    list: { paddingHorizontal: 16 },
    item: {
        paddingVertical: 12,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
    },
    symbol: { fontWeight: 'bold', fontSize: 16, color: '#000' },
    name: { fontSize: 14, color: '#333', marginTop: 2 },
    type: { fontSize: 12, color: '#666', marginTop: 2 },
});