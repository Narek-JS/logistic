import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type UserType = "Client" | "Courier";

export default function WelcomeScreen() {
  const [selectedType, setSelectedType] = useState<UserType>("Client");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Bottom sheet ref for programmatic control
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ["50%"], []);

  // Handle bottom sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log("Bottom sheet index:", index);
  }, []);

  // Open bottom sheet
  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.collapse();
    // bottomSheetRef.current?.expand({ damping: 800 });
  }, []);

  // Navigation handlers
  const handleSignIn = () => {
    router.push("/login");
  };

  const handleCreateAccount = () => {
    router.push("/login");
  };

  // Backdrop component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/welcome.png")}
        style={styles.backgroundImage}
      />

      <Pressable onPress={openBottomSheet} style={styles.testButton}>
        <Text style={styles.testButtonText}>Open Bottom Sheet</Text>
      </Pressable>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.bottomSheetBackground}
        enableDynamicSizing={false}
      >
        <BottomSheetView style={[styles.bottomSheetContent]}>
          <Text>Text</Text>
          {/* User Type Selection */}
          {/* <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedType === "Client" && styles.tabActive,
              ]}
              onPress={() => setSelectedType("Client")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedType === "Client" && styles.tabTextActive,
                ]}
              >
                Client
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                selectedType === "Courier" && styles.tabActive,
              ]}
              onPress={() => setSelectedType("Courier")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedType === "Courier" && styles.tabTextActive,
                ]}
              >
                Courier
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* Action Buttons */}
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={true}
              style={styles.primaryButton}
              onPress={handleSignIn}
              activeOpacity={0.2}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleCreateAccount}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Create an account</Text>
            </TouchableOpacity>
          </View> */}

          {/* Terms and Privacy */}
          {/* <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing to use YoLog, you agree to the YoLog{" "}
              <Text style={styles.termsLink}>terms</Text> and{" "}
              <Text style={styles.termsLink}>privacy policy</Text>.
            </Text>
          </View> */}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  testButton: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  handleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  handleIndicator: {
    backgroundColor: "#E0E0E0",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#000000",
  },
  tabText: {
    fontSize: 16,
    color: "#A0A0A0",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#000000",
    fontWeight: "600",
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#FCE100",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  secondaryButton: {
    backgroundColor: "#F3F3F3",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    fontSize: 12,
    color: "#A0A0A0",
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: "#000",
    fontWeight: "600",
  },
});
