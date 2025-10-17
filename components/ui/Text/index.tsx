import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const CustomText: React.FC<TextProps> = (props) => {
  return <Text {...props} style={[styles.defaultFont, props.style]} />;
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "open-sans",
  },
});

export { CustomText as Text };
