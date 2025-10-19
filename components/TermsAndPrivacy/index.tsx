import { View, Text, StyleSheet } from "react-native";
import { useLocale } from "@/hooks/useLocal";
import { Colors } from "@/constants/Colors";

interface Props {
  privacyCallback?: () => void;
  termsCallback?: () => void;
}

const TermsAndPrivacy: React.FC<Props> = (props) => {
  const { t } = useLocale();

  return (
    <View style={styles.termsContainer}>
      <Text style={styles.termsText}>
        {t("terms.agreement")}{" "}
        <Text style={styles.termsLink} onPress={props.termsCallback}>
          {t("terms.terms")}
        </Text>{" "}
        {t("terms.and")}{" "}
        <Text style={styles.termsLink} onPress={props.privacyCallback}>
          {t("terms.privacyPolicy")}
        </Text>
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
