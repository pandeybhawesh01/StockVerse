import { StyleSheet } from "react-native";
import { moderateScale, horizontalScale, verticalScale } from "../../utils/metrices";
import colors from "../../constants/colors";


export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom:8
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 12,
  },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(12) },
  screenTitle: { fontSize: moderateScale(18), fontWeight: '600', marginLeft: horizontalScale(12) },
  container: { flex: 1, backgroundColor: colors.white, padding: moderateScale(8) },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: colors.minusRed, marginTop: verticalScale(40), textAlign: 'center' },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(16) },
  stockName: { fontSize: moderateScale(20), fontWeight: '700' },
  metaText: { fontSize: moderateScale(12), color: colors.darkGray },

  bookmarkBtn: { backgroundColor: colors.bluePrimary, paddingHorizontal: horizontalScale(12), paddingVertical: verticalScale(6), borderRadius: moderateScale(6) },
  bookmarkText: { color: colors.white, fontWeight: '600', fontSize: moderateScale(12) },

  chart: { borderRadius: moderateScale(8), marginBottom: verticalScale(16) },

  card: {
    backgroundColor: colors.lightGray,
    padding: moderateScale(16),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: '#ddd',
    marginBottom: verticalScale(16),
  },
  cardTitle: { fontSize: moderateScale(14), fontWeight: '600', marginBottom: verticalScale(8) },

  description: { fontSize: moderateScale(12), color: colors.darkGray, lineHeight: verticalScale(18), marginBottom: verticalScale(8) },
  readMore: { color: colors.skyBlue, fontSize: moderateScale(12) },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: { 
    backgroundColor: colors.white, 
    borderRadius: moderateScale(12), 
    paddingHorizontal: horizontalScale(8), 
    paddingVertical: verticalScale(4), marginRight: verticalScale(8), marginBottom: verticalScale(8) },
  tagText: { fontSize: moderateScale(10), color: colors.purple },

  subLabel: { fontSize: moderateScale(12), color: colors.darkGray, marginBottom: verticalScale(4) },
  rowLabels: { flexDirection: 'row', justifyContent: 'space-between' },

  rangeValue: { fontSize: moderateScale(12), fontWeight: '600' },
  barTrack: { height: verticalScale(6), backgroundColor: colors.darkGray, borderRadius: 3, position: 'relative', marginVertical: verticalScale(4) },
  marker: {
    position: 'absolute',
    top: 6,
    width: 0,
    height: 0,
    borderLeftWidth: horizontalScale(6),
    borderRightWidth: horizontalScale(6),
    borderBottomWidth: verticalScale(8),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.darkGray,
  },

  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metricBlock: { width: '48%' },
  metricLabel: { fontSize: moderateScale(12), color: colors.darkGray },
  metricValue: { fontSize: moderateScale(14), fontWeight: '600', marginTop: verticalScale(4) },
});
