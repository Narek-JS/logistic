import { getVersion, isTablet } from "react-native-device-info";

// Initialize device info with proper error handling
let APP_VERSION = "1.0.0";
let IS_TABLET = false;

try {
  APP_VERSION = getVersion();
  IS_TABLET = isTablet();
} catch (error) {
  console.warn("Device info not available:", error);
  // Use default values
}

export { APP_VERSION, IS_TABLET };
