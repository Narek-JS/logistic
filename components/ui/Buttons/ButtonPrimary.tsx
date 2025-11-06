import {
  TouchableOpacityProps,
  ActivityIndicator,
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
  isLoading?: boolean;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  style,
  textStyle,
  textProps,
  children,
  isLoading,
  disabled,
  ...touchableOpacityProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, style]}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      {...touchableOpacityProps}
    >
      <Text style={[styles.primaryButtonText, textStyle]} {...textProps}>
        {isLoading ? <ActivityIndicator color="#FFFFFF" /> : children}
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
