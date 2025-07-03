import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../utils/metrices";
import colors from "../../constants/colors";


export const styles = StyleSheet.create({
  container: { flex: 1, padding: moderateScale(16), backgroundColor: colors.white },
  title: { fontSize: moderateScale(20), fontWeight: '600', marginBottom: verticalScale(12) },
  empty: { textAlign: 'center', color: colors.darkGray, marginTop: verticalScale(32) },
  row: { justifyContent: 'space-around', marginBottom: verticalScale(12) },
  removeBtn: { marginTop: verticalScale(4), backgroundColor: colors.minusRed, padding: moderateScale(4), borderRadius: moderateScale(4) },
  removeText: { color: colors.white, fontSize: moderateScale(12) },
});
