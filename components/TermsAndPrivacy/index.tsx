import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";

const TermsAndPrivacy: React.FC = () => {
  return (
    <View style={styles.termsContainer}>
      <Text style={styles.termsText}>
        By continuing to use YoLog, you agree to the YoLog{" "}
        <Text style={styles.termsLink}>terms</Text> and{" "}
        <Text style={styles.termsLink}>privacy policy</Text>.
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
