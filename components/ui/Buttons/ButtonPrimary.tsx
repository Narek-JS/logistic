import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";

interface ButtonPrimaryProps extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  style,
  textStyle,
  textProps,
  children,
  ...touchableOpacityProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, style]}
      activeOpacity={0.8}
      {...touchableOpacityProps}
    >
      <Text style={[styles.primaryButtonText, textStyle]} {...textProps}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: "100%",
    height: 50,
  },
  primaryButtonText: {
    fontWeight: "700",
    fontSize: 17,
  },
});

export { ButtonPrimary };
