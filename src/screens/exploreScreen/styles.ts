import { StyleSheet } from "react-native";
import { moderateScale, horizontalScale, verticalScale } from "../../utils/metrices";
import colors from "../../constants/colors";


export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(16),
  },
  errorText: { fontSize: moderateScale(16), color: colors.minusRed, marginBottom: verticalScale(8) },
  retryText: { color: colors.bluePrimary, fontSize: moderateScale(14) },
  section: { marginTop: verticalScale(16), paddingHorizontal: horizontalScale(16) },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  title: { fontSize: moderateScale(20), fontWeight: '600', color: colors.black },
  viewAll: { fontSize: moderateScale(14), color: colors.bluePrimary },
  row: {
    justifyContent: 'space-around',
    marginBottom: verticalScale(12),
  },
  searchBar: {
    height: verticalScale(48),
    margin: moderateScale(16),
    paddingHorizontal: horizontalScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
  },
  searchPlaceholder: {
    color: colors.darkGray,
    fontSize: moderateScale(16),
  },
});
