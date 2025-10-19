import { View, Text, StyleSheet } from "react-native";
import { useLocale } from "@/hooks/useLocal";
import { Colors } from "@/constants/Colors";

const TermsAndPrivacy: React.FC = () => {
  const { t } = useLocale();

  return (
    <View style={styles.termsContainer}>
      <Text style={styles.termsText}>
        {t("terms.agreement")}{" "}
        <Text style={styles.termsLink}>{t("terms.terms")}</Text>{" "}
        {t("terms.and")}{" "}
        <Text style={styles.termsLink}>{t("terms.privacyPolicy")}</Text>
        {t("terms.period")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    fontSize: 13,
    maxWidth: 300,
    color: Colors.secondaryLabel,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    fontSize: 13,
    color: "#000000",
    textDecorationLine: "underline",
  },
});

export { TermsAndPrivacy };
