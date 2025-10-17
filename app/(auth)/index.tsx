import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type UserType = "Client" | "Courier";

export default function WelcomeScreen() {
  const [selectedType, setSelectedType] = useState<UserType>("Client");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSignIn = () => {
    router.push("/login");
  };

  const handleCreateAccount = () => {
    router.push("/login");
  };

  useEffect(() => {
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 4000);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop disappearsOnIndex={0} {...props} />,
    []
  );

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const [visible, setVisible] = useState(false);
  return (
    <GestureHandlerRootView>
      <View style={[styles.container, { backgroundColor: "white" }]}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require("@/assets/images/welcome.png")}
          style={styles.backgroundImage}
        />

        <Pressable onPress={() => setVisible(!visible)} style={{ margin: 100 }}>
          <Text>PRess</Text>
        </Pressable>
        {/* <BottomSheetModalProvider> */}
        <BottomSheet
          onChange={(index) => {
            console.log("index", index);
            if (index === -1) {
              setVisible(false);
            }
          }}
          index={visible ? 0 : -1}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={{ flex: 1 }}>
            <Text>asdasd</Text>
            <Text>asdasd</Text>
            <Text>asdasd</Text>
            <Text>asdasd</Text>
          </BottomSheetView>
        </BottomSheet>
        {/* </BottomSheetModalProvider> */}

        {/* <GestureHandlerRootView style={styles.container}>
        <BottomSheet ref={bottomSheetRef}>
          <BottomSheetView
            style={{
              flex: 1,
              padding: 36,
              alignItems: "center",
            }}
          >
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView> */}

        {/* <View
        style={[styles.bottomSheet, { paddingBottom: insets.bottom || 24 }]}
      >
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedType === "Client" && styles.tabActive]}
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
            style={[styles.tab, selectedType === "Courier" && styles.tabActive]}
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
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
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
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing to use YoLog, you agree to the YoLog{" "}
            <Text style={styles.termsLink}>terms</Text> and{" "}
            <Text style={styles.termsLink}>privacy policy</Text>.
          </Text>
        </View>
      </View> */}
      </View>
    </GestureHandlerRootView>
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
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
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
    borderBottomColor: "transparent", // Inactive state
  },
  tabActive: {
    borderBottomColor: "#000000", // Active state
  },
  tabText: {
    fontSize: 16,
    color: "#A0A0A0", // Inactive tab text color
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
    backgroundColor: "#FCE100", // Yellow color from the screenshot
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
    backgroundColor: "#F3F3F3", // Light grey from the screenshot
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
