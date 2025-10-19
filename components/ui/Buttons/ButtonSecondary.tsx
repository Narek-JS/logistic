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

interface ButtonSecondaryProps extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
  title: string;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  title,
  style,
  textStyle,
  textProps,
  ...touchableOpacityProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, style]}
      activeOpacity={0.8}
      {...touchableOpacityProps}
    >
      <Text style={[styles.secondaryButtonText, textStyle]} {...textProps}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: "100%",
    height: 50,
  },
  secondaryButtonText: {
    fontWeight: "600",
    fontSize: 17,
  },
});

export { ButtonSecondary };
