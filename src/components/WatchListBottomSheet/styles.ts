import { StyleSheet } from "react-native";
import { moderateScale, horizontalScale, verticalScale } from "../../utils/metrices";
import colors from "../../constants/colors";

export const styles = StyleSheet.create({
  handle: {
    backgroundColor: colors.textLightGray,
    width: horizontalScale(60),
    alignSelf: 'center',
    marginBottom: horizontalScale(8),
  },
  modal: {
    padding: moderateScale(16),
    borderTopLeftRadius: horizontalScale(12),
    borderTopRightRadius: horizontalScale(12),
  },
  container: { paddingBottom: verticalScale(16) },
  title: { fontSize: moderateScale(18), fontWeight: '600', marginBottom: verticalScale(12) },
  row: {
    paddingVertical: verticalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: verticalScale(1),
  },
  rowText: { fontSize: moderateScale(16) },
  empty: { textAlign: 'center', color: colors.darkGray, marginTop: verticalScale(32) },
  addBtn: {
    marginLeft: horizontalScale(12),
    padding: moderateScale(6),
  },
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
      color: colors.black,
    },
});