import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  TextProps,
  StyleProp,
  TextStyle,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";

interface ButtonSecondaryProps extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  textProps?: TextProps;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  rightComponent,
  leftComponent,
  textStyle,
  textProps,
  children,
  style,
  ...touchableOpacityProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, style]}
      activeOpacity={0.8}
      {...touchableOpacityProps}
    >
      <View style={styles.contentContainer}>
        {leftComponent}
        <Text style={[styles.secondaryButtonText, textStyle]} {...textProps}>
          {children}
        </Text>
        {rightComponent}
      </View>
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
  contentContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  secondaryButtonText: {
    fontWeight: "600",
    fontSize: 17,
  },
});

export { ButtonSecondary };
