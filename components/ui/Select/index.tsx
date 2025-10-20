import {
  StyleSheet,
  ViewStyle,
  Pressable,
  StyleProp,
  View,
} from "react-native";
import { horizontalScale, verticalScale } from "@/utils/device-scale";
import { ArrowBottom } from "@/components/Icons/ArrowBottom";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";

interface SelectOption {
  title: ReactNode;
  value: string;
}

export interface SelectProps {
  renderSelectedValue?: (value: string) => React.ReactNode;
  onChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  error?: string;
  title?: string;
}

const Select: React.FC<SelectProps> = ({
  renderSelectedValue,
  placeholder,
  onChange,
  options,
  style,
  value,
  title,
  error,
}) => {
  const selectedOption = options.find((option) => option.value === value);

  const handleSelectPress = async () => {
    // const selectedValue = await SheetManager.show(SHEET_IDS.SELECT_OPTION, {
    //   payload: {
    //     value: value,
    //     options: options,
    //     title: title,
    //     customSearch: customSearch,
    //   },
    // });
    // if (selectedValue) {
    //   onChange?.(selectedValue);
    // }
  };

  return (
    <View style={style}>
      <Pressable onPress={handleSelectPress} style={styles.input}>
        {selectedOption ? (
          typeof selectedOption.title === "string" ? (
            <Text style={{ fontSize: 16 }}>{selectedOption.title}</Text>
          ) : typeof renderSelectedValue === "function" ? (
            renderSelectedValue(selectedOption.value)
          ) : (
            selectedOption.title
          )
        ) : (
          <Text style={{ fontSize: 16 }}>{placeholder}</Text>
        )}
        <View style={styles.arrow}>
          <ArrowBottom />
        </View>
      </Pressable>

      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    minWidth: horizontalScale(50),
    borderWidth: 0.3,
    borderColor: Colors.secondary,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    // paddingVertical: verticalScale(20),
    paddingLeft: verticalScale(16),
    height: 50,
    paddingRight: horizontalScale(50),
  },
  arrow: {
    position: "absolute",
    right: 20,
    top: "-50%",
    transform: "translateY(50%)",
  },
});

export default Select;
