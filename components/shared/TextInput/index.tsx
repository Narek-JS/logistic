import {
  type MD3Theme,
  TextInput,
  HelperText,
  useTheme,
} from "react-native-paper";
import type { TextInputProps } from "react-native-paper";
import { View, ViewStyle } from "react-native";
import { useState } from "react";

export type InputProps = Omit<
  TextInputProps,
  "mode" | "label" | "value" | "onChangeText"
> & {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  mode?: "outlined" | "flat";
  errorText?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  clearable?: boolean;
  secureToggle?: boolean;
  outlineRadius?: number;
  containerStyle?: ViewStyle;
  testID?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  mode = "outlined",
  errorText,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  clearable = false,
  secureToggle = false,
  outlineRadius = 12,
  containerStyle,
  testID,
  accessibilityLabel,
  ...rest
}) => {
  const theme = useTheme();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const effectiveSecureEntry = secureToggle ? secureTextEntry : undefined;

  const getRightIcon = () => {
    if (secureToggle) {
      return {
        icon: secureTextEntry ? "eye-off" : "eye",
        onPress: () => setSecureTextEntry(!secureTextEntry),
        accessibilityLabel: secureTextEntry ? "Show password" : "Hide password",
      };
    }

    if (clearable && value) {
      return {
        icon: "close",
        onPress: () => {
          onChangeText("");
          setIsFocused(false);
          if (rest.onBlur) {
            rest.onBlur({} as any);
          }
        },
        accessibilityLabel: "Clear input",
      };
    }

    if (rightIcon) {
      return {
        icon: rightIcon,
        onPress: onRightIconPress,
        accessibilityLabel: `Press ${rightIcon} icon`,
      };
    }

    return null;
  };

  const rightIconProps = getRightIcon();

  const customTheme: Partial<MD3Theme> = {
    ...theme,
    roundness: outlineRadius,
  };

  return (
    <View style={containerStyle} testID={testID}>
      <TextInput
        mode={mode}
        label={label}
        value={value}
        onChangeText={onChangeText}
        onFocus={(e) => {
          setIsFocused(true);
          if (rest.onFocus) rest.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (rest.onBlur) rest.onBlur(e);
        }}
        error={!!errorText}
        secureTextEntry={effectiveSecureEntry}
        outlineStyle={{
          borderRadius: outlineRadius,
        }}
        theme={customTheme}
        left={
          leftIcon ? (
            <TextInput.Icon
              icon={leftIcon}
              accessibilityLabel={`${leftIcon} icon`}
              accessibilityRole="button"
            />
          ) : undefined
        }
        right={
          rightIconProps ? (
            <TextInput.Icon
              icon={rightIconProps.icon}
              onPress={rightIconProps.onPress}
              accessibilityLabel={rightIconProps.accessibilityLabel}
              accessibilityRole="button"
            />
          ) : undefined
        }
        accessibilityLabel={accessibilityLabel || label}
        testID={testID ? `${testID}-input` : undefined}
        {...rest}
      />

      {errorText && (
        <HelperText
          type="error"
          visible={!!errorText}
          testID={testID ? `${testID}-error` : undefined}
        >
          {errorText}
        </HelperText>
      )}

      {!errorText && helperText && (
        <HelperText
          type="info"
          visible={!!helperText}
          testID={testID ? `${testID}-helper` : undefined}
        >
          {helperText}
        </HelperText>
      )}
    </View>
  );
};

export { Input as TextInput };
