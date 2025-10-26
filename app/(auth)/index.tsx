import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Buttons";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { BottomSheet } from "@/components/shared";
import { useLocale } from "@/hooks/useLocal";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui";
import { useState } from "react";

type UserType = "client" | "courier";

const WelcomeScreen: React.FC = () => {
  const [type, setType] = useState<UserType>("client");
  const { t } = useLocale();
  const router = useRouter();

  const handleSignIn = () => router.push("/login");
  const handleSignUp = () => {
    if (type === "client") {
      router.push("/(auth)/register/client/step-1");
    } else if (type === "courier") {
      router.push("/(auth)/register/driver/step-1");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/welcome.png")}
        style={styles.backgroundImage}
      />

      <BottomSheet enablePanDownToClose={false} backdrop={false} index={0}>
        <View style={styles.bottomSheetContent}>
          {/* Tab Buttons */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, type === "client" && styles.tabActive]}
              onPress={() => setType("client")}
            >
              <Text
                style={[
                  type === "client" && styles.tabTextActive,
                  styles.tabText,
                ]}
              >
                {t("client")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, type === "courier" && styles.tabActive]}
              onPress={() => setType("courier")}
            >
              <Text
                style={[
                  styles.tabText,
                  type === "courier" && styles.tabTextActive,
                ]}
              >
                {t("courier")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <ButtonPrimary onPress={handleSignIn}>{t("sign_in")}</ButtonPrimary>
            <ButtonSecondary onPress={handleSignUp}>
              {t("createAccount")}
            </ButtonSecondary>
          </View>

          {/* Terms and Privacy */}
          <TermsAndPrivacy
            termsCallback={() => console.log("Terms Pressed")}
            privacyCallback={() => console.log("Privacy Pressed")}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomSheetContent: {
    flex: 1,
    gap: 48,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
  },
  tabActive: {
    borderBottomColor: "#000000",
  },
  tabText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#000000",
    fontWeight: "600",
  },
  buttonContainer: {
    gap: 16,
  },
});

export default WelcomeScreen;
