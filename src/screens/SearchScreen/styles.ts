import { StyleSheet } from "react-native";
import { moderateScale, horizontalScale, verticalScale } from "../../utils/metrices";
import colors from "../../constants/colors";


export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    searchInput: {
        height: verticalScale(48),
        margin: moderateScale(16),
        paddingHorizontal: horizontalScale(16),
        borderRadius: moderateScale(8),
        backgroundColor: colors.lightGray,
        fontSize: moderateScale(16),
        color: colors.black,
    },
    loader: { marginTop: verticalScale(20) },
    list: { paddingHorizontal: horizontalScale(16) },
    item: {
        paddingVertical: verticalScale(12),
        borderBottomColor: colors.lightGray,
        borderBottomWidth: verticalScale(1),
    },
    symbol: { fontWeight: 'bold', fontSize: moderateScale(16), color: colors.black },
    name: { fontSize: moderateScale(14), color: colors.gray, marginTop: verticalScale(2) },
    type: { fontSize: moderateScale(12), color: colors.darkGray, marginTop: verticalScale(2) },
});