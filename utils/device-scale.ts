import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const IS_PAD = Platform.OS === "ios" && Platform.isPad;
export const IS_LANDSCAPE = width > height;

const getWidth = () => {
  if (IS_LANDSCAPE) return height;
  return width;
};

const getHeight = () => {
  if (IS_LANDSCAPE) return width;
  return height;
};

export const WINDOW_WIDTH = getWidth();
export const WINDOW_HEIGHT = getHeight();

// Guideline sizes for iPhone 16 and height is a little bit more for android to get the best scale
// Use a simple check for tablet instead of device-info
const isTabletDevice = () => {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = height / width;
  return aspectRatio < 1.6 && Math.min(width, height) >= 600;
};

const guidelineBaseWidth = isTabletDevice() ? 1024 : 390;
const guidelineBaseHeight = isTabletDevice() ? 1366 : 844;

const horizontalScale = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

const verticalScale = (size: number) =>
  (WINDOW_HEIGHT / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
