import { StyleSheet } from "react-native";
import { moderateScale, horizontalScale, verticalScale } from "../../utils/metrices";
import colors from "../../constants/colors";

export const styles = StyleSheet.create({
  card: {
    width: horizontalScale(150),
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    backgroundColor: colors.white,
    marginRight: horizontalScale(12),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(3),
    marginVertical: moderateScale(4)
  },
  ticker: { fontSize: moderateScale(16), fontWeight: '600' },
  price: { fontSize: moderateScale(14), marginVertical: verticalScale(4) },
  change: { fontSize: moderateScale(12) },
  plus: { color: colors.addGreen},
  minus: { color: colors.minusRed },
  volume: { fontSize: moderateScale(10), color: '#666', marginTop: horizontalScale(4) },
});
