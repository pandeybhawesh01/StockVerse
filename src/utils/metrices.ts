import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number => (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor: number = 0.5): number => {
  const hScaled = horizontalScale(size);
  const vScaled = verticalScale(size);
  const avgScaled = (hScaled + vScaled) / 2;
  return size + (avgScaled - size) * factor;
};

export { horizontalScale, verticalScale, moderateScale };
