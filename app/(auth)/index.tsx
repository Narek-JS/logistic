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

  const handleSignUp = () => router.push("/login");

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
              style={[type === "courier" && styles.tabActive, styles.tab]}
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
            <ButtonPrimary title={t("sign_in")} onPress={handleSignIn} />
            <ButtonSecondary
              title={t("createAccount")}
              onPress={handleSignUp}
            />
          </View>

          {/* Terms and Privacy */}
          <TermsAndPrivacy />
        </View>
      </BottomSheet>
    </View>
  );
};

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
    gap: 24,
    paddingHorizontal: 16,
    paddingTop: 8,
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
    backgroundColor: "#7878801F",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 32,
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

export default WelcomeScreen;
