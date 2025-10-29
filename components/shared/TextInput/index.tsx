import {
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
  Text,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Feather } from "@expo/vector-icons";

export interface FloatingLabelTextInputProps extends RNTextInputProps {
  onChangeText: (text: string) => void;
  containerStyle?: any;
  helperText?: string;
  errorText?: string;
  label: string;
  value: string;
}

const FloatingLabelTextInput: React.FC<FloatingLabelTextInputProps> = ({
  containerStyle,
  onChangeText,
  helperText,
  errorText,
  onFocus,
  onBlur,
  label,
  value,
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState(rest.secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsSecure(rest.secureTextEntry);
  }, [rest.secureTextEntry]);

  const toggleSecurity = () => {
    setIsSecure((prev) => !prev);
  };

  const isActive = isFocused || value.length > 0;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [isActive, animatedValue]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const labelStyle = {
    position: "absolute" as const,
    left: 16,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 6],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#666", "#333"],
    }),
    zIndex: 1,
  };

  const textInputStyle = [
    styles.textInput,
    rest.secureTextEntry && { paddingRight: 50 },
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <RNTextInput
          onChangeText={onChangeText}
          style={textInputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=""
          value={value}
          {...rest}
          secureTextEntry={isSecure}
        />

        {rest.secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={toggleSecurity}
          >
            <Feather
              name={isSecure ? "eye-off" : "eye"}
              color="#666"
              size={22}
            />
          </TouchableOpacity>
        )}
      </View>

      {errorText && <Text style={styles.errorText}>{errorText}</Text>}

      {!errorText && helperText && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 8,
  },
  inputContainer: {
    backgroundColor: "#7878801F",
    justifyContent: "center",
    position: "relative",
    borderRadius: 12,
    minHeight: 56,
  },
  textInput: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
    paddingTop: 26,
    fontSize: 16,
    color: "#000",
  },
  eyeIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 16,
    bottom: 0,
    zIndex: 2,
    top: 0,
  },
  errorText: {
    position: "absolute",
    color: "#FF3B30",
    left: 12,
    bottom: -14,
    fontSize: 12,
  },
  helperText: {
    color: "#666",
    marginLeft: 16,
    fontSize: 12,
    marginTop: 4,
  },
});

export { FloatingLabelTextInput as TextInput };
