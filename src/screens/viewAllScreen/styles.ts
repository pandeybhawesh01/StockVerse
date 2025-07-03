import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../utils/metrices";
import colors from "../../constants/colors";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(8),
    backgroundColor: colors.white
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(16)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 16,
  },
  errorText: {
    fontSize: moderateScale(16),
    color: colors.minusRed,
    marginBottom: verticalScale(8)
  },
  retryText: {
    fontSize: moderateScale(14),
    color: colors.bluePrimary
  },
  // header: {
  //   fontSize: moderateScale(24),
  //   fontWeight: '700',
  //   marginBottom: verticalScale(16),
  //   color: colors.black
  // },
  list: {
    paddingBottom: verticalScale(16)
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: verticalScale(12)
  },
});