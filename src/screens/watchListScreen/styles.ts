import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale, moderateScale } from "../../utils/metrices";
import colors from "../../constants/colors";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, padding: moderateScale(8) },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  screenTitle: { fontSize: moderateScale(24), fontWeight: '700', marginBottom: verticalScale(16) },
  list: { paddingBottom: verticalScale(24) },
  card: {
    backgroundColor: colors.lightGray,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    elevation: moderateScale(1),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardTitle: { fontSize: moderateScale(16), fontWeight: '600', color: colors.black },
  cardSubtitle: { fontSize: moderateScale(12), color: colors.darkGray, marginTop: 4 },
  separator: { height: verticalScale(12) },
  newRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(12),
    borderTopWidth: verticalScale(1),
    borderColor: colors.lightGray,
    paddingTop: verticalScale(12),
  },
  input: {
    flex: 1,
    height: verticalScale(44),
    borderRadius: moderateScale(8),
    backgroundColor: colors.lightGray,
    paddingHorizontal: horizontalScale(12),
    fontSize: moderateScale(14),
    color: 'black',
  },
  addBtn: {
    marginLeft: horizontalScale(12),
    padding: moderateScale(6),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingVertical:12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom:8
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 12,
  },
  emptyTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 8,
  textAlign: 'center',
},
emptySubtitle: {
  fontSize: 14,
  color: '#666',
  marginBottom: 24,
  textAlign: 'center',
},
addFirstBtn: {
  alignSelf: 'center',
  marginTop: 16,
},

});
