import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Pressable,
  StyleProp,
  View,
} from "react-native";
import { BottomSheetModal } from "@/components/shared/BottomSheets/BottomSheetModal";
import { horizontalScale, verticalScale } from "@/utils/device-scale";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ArrowBottom } from "@/components/Icons";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { ReactNode, useRef } from "react";

interface SelectOption {
  title: ReactNode;
  value: string;
  extra?: any;
}

export interface SelectProps {
  renderSelectedValue?: (value: string) => React.ReactNode;
  onChange?: (value: string) => void;
  inputStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  options: SelectOption[];
  placeholder?: string;
  hideArrow?: boolean;
  value?: string;
  error?: string;
  title?: string;
}

const Select: React.FC<SelectProps> = ({
  renderSelectedValue,
  hideArrow = false,
  placeholder,
  inputStyle,
  onChange,
  options,
  style,
  value,
  title,
  error,
}) => {
  const bottomSheetRef = useRef<any>(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelectPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleOptionSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <>
      <View style={style}>
        <Pressable
          onPress={handleSelectPress}
          style={[styles.input, inputStyle]}
        >
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
          {!hideArrow && (
            <View style={styles.arrow}>
              <ArrowBottom />
            </View>
          )}
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <BottomSheetModal
        onClose={() => {}}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        snapPoints={["60%"]}
        asScrollable
      >
        <BottomSheetFlatList
          data={options}
          keyExtractor={(item: any) => item.value}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handleOptionSelect(item.value)}
            >
              {item.title}
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>
                {title || "Select Option"}
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </BottomSheetModal>
    </>
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
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  bottomSheetHeader: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    marginBottom: 10,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
});

export { Select };
